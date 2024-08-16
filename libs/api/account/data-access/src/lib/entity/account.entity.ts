import { Field, ObjectType } from '@nestjs/graphql'
import { Prisma } from '@prisma/client'
import { NetworkCluster, PagingResponse } from '@pubkey-resolver/api-core-data-access'
import { GraphQLJSON } from 'graphql-scalars'
import { AccountType } from './account-type.enum'

@ObjectType()
export class Account {
  @Field()
  id!: string
  @Field({ nullable: true })
  createdAt?: Date
  @Field({ nullable: true })
  updatedAt?: Date
  @Field(() => AccountType)
  type!: AccountType
  @Field(() => NetworkCluster)
  cluster!: NetworkCluster
  @Field()
  address!: string
  @Field()
  program!: string
  @Field(() => GraphQLJSON, { nullable: true })
  data?: Prisma.JsonValue | null
  @Field({ nullable: true })
  dataHash?: string | null
  @Field({ nullable: true })
  label?: string | null
}

@ObjectType()
export class AccountPaging extends PagingResponse<Account>(Account) {}
