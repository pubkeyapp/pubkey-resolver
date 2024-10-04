import { Field, ObjectType } from '@nestjs/graphql'
import { PagingResponse } from '@pubkey-resolver/api-core-data-access'
import { Index } from '@pubkey-resolver/api-index-data-access'
import { Wallet } from '@pubkey-resolver/api-wallet-data-access'

@ObjectType()
export class IndexWallet {
  @Field()
  id!: string
  @Field({ nullable: true })
  createdAt?: Date
  @Field({ nullable: true })
  updatedAt?: Date
  @Field()
  indexId!: string
  @Field(() => Index, { nullable: true })
  index?: Index
  @Field()
  walletId!: string
  @Field(() => Wallet, { nullable: true })
  wallet?: Wallet
}

@ObjectType()
export class IndexWalletPaging extends PagingResponse<IndexWallet>(IndexWallet) {}
