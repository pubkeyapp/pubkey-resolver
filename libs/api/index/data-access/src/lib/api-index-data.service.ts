import { Injectable } from '@nestjs/common'
import { NetworkCluster, Prisma } from '@prisma/client'
import { ApiCoreService, PagingInputFields } from '@pubkey-resolver/api-core-data-access'
import { ApiIndexResolverService } from './api-index-resolver.service'
import { IndexPaging } from './entity/index.entity'
import { ensureValidSolanaAddress } from './helpers/ensure-valid-solana-address'
import { getIndexId } from './helpers/get-index-id'

export type ApiIndexDataCreateInput = Omit<Prisma.IndexUncheckedCreateInput, 'id' | 'program'>

@Injectable()
export class ApiIndexDataService {
  constructor(private readonly core: ApiCoreService, private readonly resolver: ApiIndexResolverService) {}

  async create(input: ApiIndexDataCreateInput) {
    ensureValidSolanaAddress(input.address)
    const exists = await this.findClusterAddress(input)
    if (exists) {
      throw new Error(`Index ${input.address} already exists on ${input.cluster}`)
    }

    const info = await this.resolver.getAccountInfo({ address: input.address, cluster: input.cluster })
    if (!info?.owner) {
      throw new Error(`Index ${input.address} not found on ${input.cluster}`)
    }

    return this.storeIndex({ ...input, program: info.owner.toBase58(), id: getIndexId(input) })
  }

  private async storeIndex(input: Prisma.IndexUncheckedCreateInput) {
    return this.core.data.index.create({ data: { ...input, id: getIndexId(input) } })
  }

  async delete(indexId: string) {
    await this.findOne(indexId)
    const deleted = await this.core.data.index.delete({ where: { id: indexId } })
    return !!deleted
  }

  async findMany({
    limit = 10,
    page = 1,
    ...input
  }: Prisma.IndexFindManyArgs & PagingInputFields): Promise<IndexPaging> {
    return this.core.data.index
      .paginate(input)
      .withPages({ limit, page })
      .then(([data, meta]) => ({ data, meta }))
  }

  async findOne(indexId: string) {
    const found = await this.core.data.index.findUnique({ where: { id: indexId } })
    if (!found) {
      throw new Error('Index not found')
    }
    return found
  }

  async findClusterAddress({ address, cluster }: { address: string; cluster: NetworkCluster }) {
    return this.core.data.index.findUnique({ where: { address_cluster: { address, cluster } } })
  }

  async update(indexId: string, input: Prisma.IndexUpdateInput) {
    return this.core.data.index.update({ where: { id: indexId }, data: input })
  }
}
