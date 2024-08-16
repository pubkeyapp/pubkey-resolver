import { Prisma } from '@prisma/client'
import { IndexAdminFindManyInput } from '../dto/index-admin-find-many.input'

export function getIndexWhereAdminInput(input: IndexAdminFindManyInput): Prisma.IndexWhereInput {
  const where: Prisma.IndexWhereInput = {
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
