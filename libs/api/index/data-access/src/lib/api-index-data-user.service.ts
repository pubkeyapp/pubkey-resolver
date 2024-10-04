import { Injectable } from '@nestjs/common'
import { ApiIndexDataService } from './api-index-data.service'
import { IndexUserFindManyInput } from './dto/index-user-find-many.input'
import { IndexPaging } from './entity/index.entity'
import { getIndexWhereUserInput } from './helpers/get-index-where-user.input'

@Injectable()
export class ApiIndexDataUserService {
  constructor(private readonly data: ApiIndexDataService) {}

  async findManyIndex(input: IndexUserFindManyInput): Promise<IndexPaging> {
    return this.data.findMany({
      orderBy: [{ type: 'asc' }, { label: 'asc' }],
      where: getIndexWhereUserInput(input),
      limit: input.limit,
      page: input.page,
    })
  }

  async findOneIndex(indexId: string) {
    return this.data.findOne(indexId)
  }
}
