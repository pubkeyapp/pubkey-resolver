import { Injectable } from '@nestjs/common'
import { AccountAdminCreateInput } from './dto/account-admin-create.input'
import { AccountAdminFindManyInput } from './dto/account-admin-find-many.input'
import { AccountAdminUpdateInput } from './dto/account-admin-update.input'
import { AccountPaging } from './entity/account.entity'
import { getAccountWhereAdminInput } from './helpers/get-account-where-admin.input'
import { ApiAccountDataService } from './api-account-data.service'

@Injectable()
export class ApiAccountDataAdminService {
  constructor(private readonly data: ApiAccountDataService) {}

  async createAccount(input: AccountAdminCreateInput) {
    return this.data.create(input)
  }

  async deleteAccount(accountId: string) {
    return this.data.delete(accountId)
  }

  async findManyAccount(input: AccountAdminFindManyInput): Promise<AccountPaging> {
    return this.data.findMany({
      orderBy: { createdAt: 'desc' },
      where: getAccountWhereAdminInput(input),
      limit: input.limit,
      page: input.page,
    })
  }

  async findOneAccount(accountId: string) {
    return this.data.findOne(accountId)
  }

  async updateAccount(accountId: string, input: AccountAdminUpdateInput) {
    return this.data.update(accountId, input)
  }
}
