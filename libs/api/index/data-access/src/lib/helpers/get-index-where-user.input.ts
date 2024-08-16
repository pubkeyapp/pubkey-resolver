import { Prisma } from '@prisma/client'
import { IndexUserFindManyInput } from '../dto/index-user-find-many.input'

export function getIndexWhereUserInput(input: IndexUserFindManyInput): Prisma.IndexWhereInput {
  const where: Prisma.IndexWhereInput = {
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
