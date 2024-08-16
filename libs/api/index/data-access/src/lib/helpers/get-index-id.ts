import { Prisma } from '@prisma/client'

export function getIndexId(input: Pick<Prisma.IndexCreateInput, 'cluster' | 'address'>) {
  return `${input.cluster}-${input.address}`
}
