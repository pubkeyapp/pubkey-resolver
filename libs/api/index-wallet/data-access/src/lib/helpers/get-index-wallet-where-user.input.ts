import { Prisma } from '@prisma/client'
import { IndexWalletUserFindManyInput } from '../dto/index-wallet-user-find-many.input'

export function getIndexWalletWhereUserInput(input: IndexWalletUserFindManyInput): Prisma.IndexWalletWhereInput {
  const where: Prisma.IndexWalletWhereInput = {
    walletId: input.walletId,
  }

  if (input.search) {
    where.OR = [
      { id: { contains: input.search, mode: 'insensitive' } },
      { index: { id: { contains: input.search, mode: 'insensitive' } } },
      { index: { label: { contains: input.search, mode: 'insensitive' } } },
      { wallet: { id: { contains: input.search, mode: 'insensitive' } } },
      { wallet: { label: { contains: input.search, mode: 'insensitive' } } },
    ]
  }

  return where
}
