import { Injectable } from '@nestjs/common'
import { ApiIndexEntryDataService } from './api-index-entry-data.service'
import { IndexEntryUserFindManyInput } from './dto/index-entry-user-find-many.input'
import { IndexEntryPaging } from './entity/index-entry.entity'
import { getIndexEntryWhereUserInput } from './helpers/get-index-entry-where-user.input'

@Injectable()
export class ApiIndexEntryDataUserService {
  constructor(private readonly data: ApiIndexEntryDataService) {}

  async findManyIndexEntry(input: IndexEntryUserFindManyInput): Promise<IndexEntryPaging> {
    return this.data.findMany({
      orderBy: { createdAt: 'desc' },
      where: getIndexEntryWhereUserInput(input),
      limit: input.limit,
      page: input.page,
    })
  }

  async findOneIndexEntry(indexEntryId: string) {
    return this.data.findOne(indexEntryId)
  }
}
