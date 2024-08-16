import { Prisma } from '@prisma/client'
import { AccountAdminFindManyInput } from '../dto/account-admin-find-many.input'

export function getAccountWhereAdminInput(input: AccountAdminFindManyInput): Prisma.AccountWhereInput {
  const where: Prisma.AccountWhereInput = {
    cluster: input.cluster ?? undefined,
    type: input.type ?? undefined,
  }

  if (input.search) {
    where.OR = [
      { id: { contains: input.search, mode: 'insensitive' } },
      { address: { contains: input.search, mode: 'insensitive' } },
    ]
  }

  return where
}
