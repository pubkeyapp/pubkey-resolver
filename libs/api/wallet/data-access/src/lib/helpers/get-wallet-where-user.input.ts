import { Prisma } from '@prisma/client'
import { WalletUserFindManyInput } from '../dto/wallet-user-find-many.input'

export function getWalletWhereUserInput(input: WalletUserFindManyInput): Prisma.WalletWhereInput {
  const where: Prisma.WalletWhereInput = {}

  if (input.search) {
    where.OR = [
      { id: { contains: input.search, mode: 'insensitive' } },
      { label: { contains: input.search, mode: 'insensitive' } },
    ]
  }

  return where
}
