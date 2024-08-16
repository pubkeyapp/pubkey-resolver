import { Injectable } from '@nestjs/common'
import { ApiAccountDataService } from './api-account-data.service'
import { AccountUserFindManyInput } from './dto/account-user-find-many.input'
import { AccountPaging } from './entity/account.entity'
import { getAccountWhereUserInput } from './helpers/get-account-where-user.input'

@Injectable()
export class ApiAccountDataUserService {
  constructor(private readonly data: ApiAccountDataService) {}

  async findManyAccount(input: AccountUserFindManyInput): Promise<AccountPaging> {
    return this.data.findMany({
      orderBy: { createdAt: 'desc' },
      where: getAccountWhereUserInput(input),
      limit: input.limit,
      page: input.page,
    })
  }

  async findOneAccount(accountId: string) {
    return this.data.findOne(accountId)
  }
}
