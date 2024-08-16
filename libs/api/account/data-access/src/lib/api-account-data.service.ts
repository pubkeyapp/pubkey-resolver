import { Injectable } from '@nestjs/common'
import { NetworkCluster, Prisma } from '@prisma/client'
import { ApiCoreService, PagingInputFields } from '@pubkey-resolver/api-core-data-access'
import { PublicKey } from '@solana/web3.js'
import { ApiAccountResolverService } from './api-account-resolver.service'
import { AccountType } from './entity/account-type.enum'
import { AccountPaging } from './entity/account.entity'
import { ensureValidSolanaAddress } from './helpers/ensure-valid-solana-address'
import { getAccountId } from './helpers/get-account-id'

@Injectable()
export class ApiAccountDataService {
  constructor(private readonly core: ApiCoreService, private readonly resolver: ApiAccountResolverService) {}

  async create(input: Omit<Prisma.AccountUncheckedCreateInput, 'id' | 'program'>) {
    ensureValidSolanaAddress(input.address)
    const exists = await this.findClusterAddress(input)
    if (exists) {
      throw new Error(`Account ${input.address} already exists on ${input.cluster}`)
    }

    if (input.type === AccountType.SolanaGenesis) {
      const genesisHash = await this.resolver.getGenesisHash()
      if (genesisHash !== input.address) {
        throw new Error(`Genesis hash ${input.address} does not match ${genesisHash}`)
      }
      return this.storeAccount({ ...input, program: PublicKey.default.toBase58(), id: getAccountId(input) })
    }

    const info = await this.resolver.getAccountInfo({ address: input.address, cluster: input.cluster })
    if (!info?.owner) {
      throw new Error(`Account ${input.address} not found on ${input.cluster}`)
    }

    return this.storeAccount({ ...input, program: info.owner.toBase58(), id: getAccountId(input) })
  }

  private async storeAccount(input: Prisma.AccountUncheckedCreateInput) {
    return this.core.data.account.create({ data: { ...input, id: getAccountId(input) } })
  }

  async delete(accountId: string) {
    await this.findOne(accountId)
    const deleted = await this.core.data.account.delete({ where: { id: accountId } })
    return !!deleted
  }

  async findMany({
    limit = 10,
    page = 1,
    ...input
  }: Prisma.AccountFindManyArgs & PagingInputFields): Promise<AccountPaging> {
    return this.core.data.account
      .paginate(input)
      .withPages({ limit, page })
      .then(([data, meta]) => ({ data, meta }))
  }

  async findOne(accountId: string) {
    const found = await this.core.data.account.findUnique({ where: { id: accountId } })
    if (!found) {
      throw new Error('Account not found')
    }
    return found
  }

  async findClusterAddress({ address, cluster }: { address: string; cluster: NetworkCluster }) {
    return this.core.data.account.findUnique({ where: { address_cluster: { address, cluster } } })
  }

  async update(accountId: string, input: Prisma.AccountUpdateInput) {
    return this.core.data.account.update({ where: { id: accountId }, data: input })
  }
}
