import { Injectable } from '@nestjs/common'
import { ApiIndexWalletDataService } from './api-index-wallet-data.service'
import { IndexWalletUserFindManyInput } from './dto/index-wallet-user-find-many.input'
import { IndexWalletUserUpdateInput } from './dto/index-wallet-user-update.input'
import { IndexWalletPaging } from './entity/index-wallet.entity'
import { getIndexWalletWhereUserInput } from './helpers/get-index-wallet-where-user.input'

@Injectable()
export class ApiIndexWalletDataUserService {
  constructor(private readonly data: ApiIndexWalletDataService) {}

  async deleteIndexWallet(indexWalletId: string) {
    return this.data.delete(indexWalletId)
  }

  async findManyIndexWallet(input: IndexWalletUserFindManyInput): Promise<IndexWalletPaging> {
    return this.data.findMany({
      orderBy: { createdAt: 'desc' },
      where: getIndexWalletWhereUserInput(input),
      limit: input.limit,
      page: input.page,
      include: { index: true },
    })
  }

  async findOneIndexWallet(indexWalletId: string) {
    return this.data.findOne(indexWalletId)
  }

  async updateIndexWallet(indexWalletId: string, input: IndexWalletUserUpdateInput) {
    return this.data.update(indexWalletId, input)
  }
}
