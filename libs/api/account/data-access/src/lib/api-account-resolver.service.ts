import { DasApiAsset } from '@metaplex-foundation/digital-asset-standard-api'
import { publicKey } from '@metaplex-foundation/umi'
import { Injectable, Logger } from '@nestjs/common'
import { ApiCoreService, NetworkCluster } from '@pubkey-resolver/api-core-data-access'
import { TOKEN_2022_PROGRAM_ID, TOKEN_PROGRAM_ID } from '@solana/spl-token'
import { AccountInfo, ParsedAccountData, PublicKey } from '@solana/web3.js'
import { AccountType } from './entity/account-type.enum'
import { ensureValidSolanaAddress } from './helpers/ensure-valid-solana-address'

@Injectable()
export class ApiAccountResolverService {
  private readonly logger = new Logger(ApiAccountResolverService.name)

  constructor(private readonly core: ApiCoreService) {
    this.core.network
      .ensureConnection(NetworkCluster.SolanaMainnet)
      .getGenesisHash()
      .then((res) => {
        console.log(res)
      })
  }

  async resolveAccount({ address, cluster }: AccountResolveInput) {
    ensureValidSolanaAddress(address)
    this.logger.verbose(`Resolving account ${address} on ${cluster}`)

    const info = await this.getAccountInfo({ address, cluster })
    if (!info) {
      throw new Error(`Account ${address} not found on ${cluster}`)
    }

    const type = getAccountType(info)
    if (!type) {
      throw new Error(`Can't resolve account type for ${address} on ${cluster}`)
    }

    this.logger.verbose(`Account ${type}: ${address} found on ${cluster}`, info)

    if (type === AccountType.SolanaFungible) {
      const asset = await this.getAsset({ cluster, account: address })

      if (!asset) {
        throw new Error(`Asset not found for ${address} on ${cluster}`)
      }

      this.logger.verbose(`Asset found for ${address} on ${cluster}`, asset)
    }

    return null
  }

  async resolveWallet({ address, cluster }: AccountResolveInput) {
    ensureValidSolanaAddress(address)
    const found = await this.core.data.account.findUnique({ where: { address_cluster: { address, cluster } } })
    if (!found) {
      throw new Error(`Account ${address} not found on ${cluster}`)
    }
    if (found.type !== AccountType.SolanaWallet) {
      throw new Error(`Account ${address} is not a wallet on ${cluster}`)
    }
    const resolvers = await this.core.data.account.findMany({
      where: {
        type: { in: [AccountType.SolanaFungible, AccountType.SolanaNonFungible] },
        cluster,
      },
    })
    const resolversMap = {
      [AccountType.SolanaFungible]: resolvers.filter((r) => r.type === AccountType.SolanaFungible),
      [AccountType.SolanaNonFungible]: resolvers.filter((r) => r.type === AccountType.SolanaNonFungible),
    }
    this.logger.verbose(`Resolving wallet ${address} on ${cluster}`)

    return {
      resolversMap,
    }
  }

  async getAccountInfo({ address, cluster }: AccountResolveInput): Promise<SolanaAccountInfo> {
    return this.core.network
      .ensureConnection(cluster)
      .getParsedAccountInfo(new PublicKey(address))
      .then((res) => res.value as SolanaAccountInfo)
  }

  async getAsset({
    cluster,
    account,
  }: {
    cluster: NetworkCluster
    account: string
  }): Promise<DasApiAsset & { mint_extensions?: Record<string, Record<string, string>> }> {
    return this.core.network.getUmi(cluster).rpc.getAsset(publicKey(account))
  }

  async getGenesisHash() {
    return this.core.network.getConnection(NetworkCluster.SolanaMainnet).getGenesisHash()
  }
}

export interface AccountResolveInput {
  cluster: NetworkCluster
  address: string
}

export type SolanaAccountInfo = AccountInfo<ParsedAccountData>

function getAccountType(account: AccountInfo<ParsedAccountData>): AccountType | undefined {
  if ([TOKEN_2022_PROGRAM_ID.toBase58(), TOKEN_PROGRAM_ID.toBase58()].includes(account.owner.toBase58())) {
    return AccountType.SolanaFungible
  }
  console.log(JSON.stringify(account.data))
  console.log(JSON.stringify(account.data))
  return undefined
}
