import { Prisma } from '@prisma/client'

export function getAccountId(input: Pick<Prisma.AccountCreateInput, 'cluster' | 'address'>) {
  return `${input.cluster}-${input.address}`
}
