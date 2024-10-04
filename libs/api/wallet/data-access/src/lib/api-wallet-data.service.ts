import { Injectable, Logger } from '@nestjs/common'
import { Prisma } from '@prisma/client'
import { ApiCoreService, ellipsify, PagingInputFields } from '@pubkey-resolver/api-core-data-access'
import { WalletPaging } from './entity/wallet.entity'

@Injectable()
export class ApiWalletDataService {
  private readonly logger = new Logger(ApiWalletDataService.name)
  constructor(private readonly core: ApiCoreService) {}

  async create(input: Omit<Prisma.WalletUncheckedCreateInput, 'label'> & { id: string; label?: string }) {
    return this.core.data.wallet.create({
      data: { ...input, label: input.label?.trim()?.length ? input.label : ellipsify(input.id) },
    })
  }

  async delete(walletId: string) {
    await this.findOne(walletId)
    const deleted = await this.core.data.wallet.delete({ where: { id: walletId } })
    return !!deleted
  }

  async findMany({
    limit = 10,
    page = 1,
    ...input
  }: Prisma.WalletFindManyArgs & PagingInputFields): Promise<WalletPaging> {
    return this.core.data.wallet
      .paginate(input)
      .withPages({ limit, page })
      .then(([data, meta]) => ({ data, meta }))
  }

  async findOne(walletId: string) {
    const found = await this.core.data.wallet.findUnique({ where: { id: walletId } })
    if (!found) {
      throw new Error('Wallet not found')
    }
    return found
  }

  async findOrCreate(walletId: string) {
    const found = await this.core.data.wallet.findUnique({ where: { id: walletId } })
    if (found) {
      return found
    }
    this.logger.verbose(`Creating wallet ${walletId}`)
    return this.create({ id: walletId })
  }

  async update(walletId: string, input: Prisma.WalletUpdateInput) {
    return this.core.data.wallet.update({ where: { id: walletId }, data: input })
  }
}
