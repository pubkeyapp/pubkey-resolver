import { Field, ObjectType } from '@nestjs/graphql'
import { Prisma } from '@prisma/client'
import { NetworkCluster, PagingResponse } from '@pubkey-resolver/api-core-data-access'
import { GraphQLJSON } from 'graphql-scalars'

@ObjectType()
export class IndexEntry {
  @Field()
  id!: string
  @Field({ nullable: true })
  createdAt?: Date
  @Field({ nullable: true })
  updatedAt?: Date
  @Field(() => NetworkCluster)
  cluster!: NetworkCluster
  @Field()
  indexAddress!: string
  @Field()
  address!: string
  @Field()
  amount!: string
  @Field()
  program!: string
  @Field()
  walletId!: string
  @Field(() => GraphQLJSON, { nullable: true })
  data?: Prisma.JsonValue | null
  @Field({ nullable: true })
  dataHash?: string | null
  @Field({ nullable: true })
  label?: string | null
}

@ObjectType()
export class IndexEntryPaging extends PagingResponse<IndexEntry>(IndexEntry) {}
