import { Prisma } from '@prisma/client'
import { AccountUserFindManyInput } from '../dto/account-user-find-many.input'

export function getAccountWhereUserInput(input: AccountUserFindManyInput): Prisma.AccountWhereInput {
  const where: Prisma.AccountWhereInput = {
    cluster: input.cluster,
    type: input.type,
  }

  if (input.search) {
    where.OR = [
      { id: { contains: input.search, mode: 'insensitive' } },
      { address: { contains: input.search, mode: 'insensitive' } },
    ]
  }

  return where
}
