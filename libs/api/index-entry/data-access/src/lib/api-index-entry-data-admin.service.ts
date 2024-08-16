import { Injectable } from '@nestjs/common'
import { ApiIndexEntryDataService } from './api-index-entry-data.service'
import { IndexEntryAdminFindManyInput } from './dto/index-entry-admin-find-many.input'
import { IndexEntryPaging } from './entity/index-entry.entity'
import { getIndexEntryWhereAdminInput } from './helpers/get-index-entry-where-admin.input'

@Injectable()
export class ApiIndexEntryDataAdminService {
  constructor(private readonly data: ApiIndexEntryDataService) {}

  async deleteIndexEntry(indexEntryId: string) {
    return this.data.delete(indexEntryId)
  }

  async findManyIndexEntry(input: IndexEntryAdminFindManyInput): Promise<IndexEntryPaging> {
    return this.data.findMany({
      orderBy: { createdAt: 'desc' },
      where: getIndexEntryWhereAdminInput(input),
      limit: input.limit,
      page: input.page,
    })
  }

  async findOneIndexEntry(indexEntryId: string) {
    return this.data.findOne(indexEntryId)
  }
}
