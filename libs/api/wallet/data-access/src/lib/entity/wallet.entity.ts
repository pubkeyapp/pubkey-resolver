import { Field, ObjectType } from '@nestjs/graphql'
import { PagingResponse } from '@pubkey-resolver/api-core-data-access'

@ObjectType()
export class Wallet {
  @Field()
  id!: string
  @Field({ nullable: true })
  createdAt?: Date
  @Field({ nullable: true })
  updatedAt?: Date
  @Field()
  label!: string
}

@ObjectType()
export class WalletPaging extends PagingResponse<Wallet>(Wallet) {}
