import { Prisma } from '@prisma/client'
import { IndexEntryAdminFindManyInput } from '../dto/index-entry-admin-find-many.input'

export function getIndexEntryWhereAdminInput(input: IndexEntryAdminFindManyInput): Prisma.IndexEntryWhereInput {
  const where: Prisma.IndexEntryWhereInput = {
    cluster: input.cluster,
    indexAddress: input.indexAddress,
  }

  if (input.search) {
    where.OR = [
      { id: { contains: input.search, mode: 'insensitive' } },
      { label: { contains: input.search, mode: 'insensitive' } },
    ]
  }

  return where
}
