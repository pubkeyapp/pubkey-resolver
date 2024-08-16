import { Injectable } from '@nestjs/common'
import { IndexAdminCreateInput } from './dto/index-admin-create.input'
import { IndexAdminFindManyInput } from './dto/index-admin-find-many.input'
import { IndexAdminUpdateInput } from './dto/index-admin-update.input'
import { IndexPaging } from './entity/index.entity'
import { getIndexWhereAdminInput } from './helpers/get-index-where-admin.input'
import { ApiIndexDataService } from './api-index-data.service'

@Injectable()
export class ApiIndexDataAdminService {
  constructor(private readonly data: ApiIndexDataService) {}

  async createIndex(input: IndexAdminCreateInput) {
    return this.data.create(input)
  }

  async deleteIndex(indexId: string) {
    return this.data.delete(indexId)
  }

  async findManyIndex(input: IndexAdminFindManyInput): Promise<IndexPaging> {
    return this.data.findMany({
      orderBy: { createdAt: 'desc' },
      where: getIndexWhereAdminInput(input),
      limit: input.limit,
      page: input.page,
    })
  }

  async findOneIndex(indexId: string) {
    return this.data.findOne(indexId)
  }

  async updateIndex(indexId: string, input: IndexAdminUpdateInput) {
    return this.data.update(indexId, input)
  }
}
