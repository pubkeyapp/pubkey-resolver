import { Injectable } from '@nestjs/common'
import { Prisma } from '@prisma/client'
import { ApiCoreService, PagingInputFields } from '@pubkey-resolver/api-core-data-access'
import { IndexWalletPaging } from './entity/index-wallet.entity'

@Injectable()
export class ApiIndexWalletDataService {
  constructor(private readonly core: ApiCoreService) {}

  async delete(indexWalletId: string) {
    await this.findOne(indexWalletId)
    const deleted = await this.core.data.indexWallet.delete({ where: { id: indexWalletId } })
    return !!deleted
  }

  async findMany({
    limit = 10,
    page = 1,
    ...input
  }: Prisma.IndexWalletFindManyArgs & PagingInputFields): Promise<IndexWalletPaging> {
    return this.core.data.indexWallet
      .paginate(input)
      .withPages({ limit, page })
      .then(([data, meta]) => ({ data, meta }))
  }

  async findOne(indexWalletId: string) {
    const found = await this.core.data.indexWallet.findUnique({
      where: { id: indexWalletId },
      include: { index: true },
    })
    if (!found) {
      throw new Error('IndexWallet not found')
    }
    return found
  }

  async update(indexWalletId: string, input: Prisma.IndexWalletUpdateInput) {
    return this.core.data.indexWallet.update({ where: { id: indexWalletId }, data: input })
  }
}
