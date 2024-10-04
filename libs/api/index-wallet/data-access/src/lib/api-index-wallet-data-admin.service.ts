import { Injectable } from '@nestjs/common'
import { ApiIndexWalletDataService } from './api-index-wallet-data.service'
import { IndexWalletAdminFindManyInput } from './dto/index-wallet-admin-find-many.input'
import { IndexWalletAdminUpdateInput } from './dto/index-wallet-admin-update.input'
import { IndexWalletPaging } from './entity/index-wallet.entity'
import { getIndexWalletWhereAdminInput } from './helpers/get-index-wallet-where-admin.input'

@Injectable()
export class ApiIndexWalletDataAdminService {
  constructor(private readonly data: ApiIndexWalletDataService) {}

  async deleteIndexWallet(indexWalletId: string) {
    return this.data.delete(indexWalletId)
  }

  async findManyIndexWallet(input: IndexWalletAdminFindManyInput): Promise<IndexWalletPaging> {
    return this.data.findMany({
      orderBy: [{ index: { type: 'asc' } }, { index: { label: 'asc' } }],
      where: getIndexWalletWhereAdminInput(input),
      limit: input.limit,
      page: input.page,
      include: {
        index: { include: { entries: { where: { walletId: input.walletId } } } },
      },
    })
  }

  async findOneIndexWallet(indexWalletId: string) {
    return this.data.findOne(indexWalletId)
  }

  async updateIndexWallet(indexWalletId: string, input: IndexWalletAdminUpdateInput) {
    return this.data.update(indexWalletId, input)
  }
}
