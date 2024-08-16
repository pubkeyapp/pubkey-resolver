import { registerEnumType } from '@nestjs/graphql'
import { IndexType } from '@prisma/client'
export { IndexType }

registerEnumType(IndexType, { name: 'IndexType' })