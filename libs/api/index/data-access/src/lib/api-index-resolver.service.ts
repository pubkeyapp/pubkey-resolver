import { DasApiAsset } from '@metaplex-foundation/digital-asset-standard-api'
import { publicKey } from '@metaplex-foundation/umi'
import { Injectable, Logger } from '@nestjs/common'
import { ApiCoreService, NetworkCluster } from '@pubkey-resolver/api-core-data-access'
import { TOKEN_2022_PROGRAM_ID, TOKEN_PROGRAM_ID } from '@solana/spl-token'
import { AccountInfo, ParsedAccountData, PublicKey } from '@solana/web3.js'
import { IndexType } from './entity/index-type.enum'
import { ensureValidSolanaAddress } from './helpers/ensure-valid-solana-address'

@Injectable()
export class ApiIndexResolverService {
  private readonly logger = new Logger(ApiIndexResolverService.name)

  constructor(private readonly core: ApiCoreService) {}

  async resolveIndex({ address, cluster }: IndexResolveInput) {
    ensureValidSolanaAddress(address)
    this.logger.verbose(`Resolving index ${address} on ${cluster}`)

    const info = await this.getAccountInfo({ address, cluster })
    if (!info) {
      throw new Error(`Index ${address} not found on ${cluster}`)
    }

    const type = getIndexType(info)
    if (!type) {
      throw new Error(`Can't resolve index type for ${address} on ${cluster}`)
    }

    this.logger.verbose(`Index ${type}: ${address} found on ${cluster}`, info)

    if (type === IndexType.SolanaMint) {
      const asset = await this.getAsset({ cluster, index: address })

      if (!asset) {
        throw new Error(`Asset not found for ${address} on ${cluster}`)
      }

      this.logger.verbose(`Asset found for ${address} on ${cluster}`, asset)
    }

    return null
  }

  async resolveWallet({ address, cluster }: IndexResolveInput, wallet: string) {
    ensureValidSolanaAddress(address)
    ensureValidSolanaAddress(wallet)

    const found = await this.ensureIndex({ address, cluster })

    if (![IndexType.SolanaCollection, IndexType.SolanaMint].includes(found.type)) {
      throw new Error(`Index ${address} is not a collection or mint on ${cluster}`)
    }

    if (found.type === IndexType.SolanaMint) {
      this.logger.verbose(`Resolving mint ${address} on ${cluster} for wallet ${wallet}`)
      const tokenIndexes = await this.core.network.getTokenAccountsByMint({
        cluster,
        wallet,
        programId: found.program,
        mint: found.address,
      })
      return {
        found,
        tokenIndexes,
      }
    }

    // getTokenAccountsByMint

    this.logger.verbose(`Resolving wallet ${address} on ${cluster}`)

    return {
      found,
    }
  }

  async getAccountInfo({ address, cluster }: IndexResolveInput): Promise<SolanaAccountInfo> {
    return this.core.network
      .ensureConnection(cluster)
      .getParsedAccountInfo(new PublicKey(address))
      .then((res) => res.value as SolanaAccountInfo)
  }

  async getAsset({
    cluster,
    index,
  }: {
    cluster: NetworkCluster
    index: string
  }): Promise<DasApiAsset & { mint_extensions?: Record<string, Record<string, string>> }> {
    return this.core.network.getUmi(cluster).rpc.getAsset(publicKey(index))
  }

  private async ensureIndex({ address, cluster }: IndexResolveInput) {
    const found = await this.core.data.index.findUnique({ where: { address_cluster: { address, cluster } } })
    if (!found) {
      throw new Error(`Index ${address} not found on ${cluster}`)
    }
    return found
  }
}

export interface IndexResolveInput {
  cluster: NetworkCluster
  address: string
}

export type SolanaAccountInfo = AccountInfo<ParsedAccountData>

function getIndexType(index: AccountInfo<ParsedAccountData>): IndexType | undefined {
  if ([TOKEN_2022_PROGRAM_ID.toBase58(), TOKEN_PROGRAM_ID.toBase58()].includes(index.owner.toBase58())) {
    return IndexType.SolanaMint
  }
  console.log(JSON.stringify(index.data))
  console.log(JSON.stringify(index.data))
  return undefined
}
