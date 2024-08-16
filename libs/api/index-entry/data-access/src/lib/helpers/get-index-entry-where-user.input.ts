import { Prisma } from '@prisma/client'
import { IndexEntryUserFindManyInput } from '../dto/index-entry-user-find-many.input'

export function getIndexEntryWhereUserInput(input: IndexEntryUserFindManyInput): Prisma.IndexEntryWhereInput {
  const where: Prisma.IndexEntryWhereInput = {
    cluster: input.cluster,
    indexAddress: input.indexAddress,
  }

  if (input.search) {
    where.OR = [
      { id: { contains: input.search, mode: 'insensitive' } },
      { address: { contains: input.search, mode: 'insensitive' } },
      { wallet: { contains: input.search, mode: 'insensitive' } },
      { label: { contains: input.search, mode: 'insensitive' } },
    ]
  }

  return where
}
