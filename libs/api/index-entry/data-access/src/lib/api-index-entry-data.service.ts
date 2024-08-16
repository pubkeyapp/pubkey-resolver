import { Injectable } from '@nestjs/common'
import { Prisma } from '@prisma/client'
import { ApiCoreService, PagingInputFields } from '@pubkey-resolver/api-core-data-access'
import { IndexEntryPaging } from './entity/index-entry.entity'

@Injectable()
export class ApiIndexEntryDataService {
  constructor(private readonly core: ApiCoreService) {}

  async create(input: Prisma.IndexEntryUncheckedCreateInput) {
    return this.core.data.indexEntry.create({ data: input })
  }

  async delete(indexEntryId: string) {
    await this.findOne(indexEntryId)
    const deleted = await this.core.data.indexEntry.delete({ where: { id: indexEntryId } })
    return !!deleted
  }

  async findMany({
    limit = 10,
    page = 1,
    ...input
  }: Prisma.IndexEntryFindManyArgs & PagingInputFields): Promise<IndexEntryPaging> {
    return this.core.data.indexEntry
      .paginate(input)
      .withPages({ limit, page })
      .then(([data, meta]) => ({ data, meta }))
  }

  async findOne(indexEntryId: string) {
    const found = await this.core.data.indexEntry.findUnique({ where: { id: indexEntryId } })
    if (!found) {
      throw new Error('IndexEntry not found')
    }
    return found
  }

  async update(indexEntryId: string, input: Prisma.IndexEntryUpdateInput) {
    return this.core.data.indexEntry.update({ where: { id: indexEntryId }, data: input })
  }
}
