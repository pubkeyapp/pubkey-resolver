import { Field, InputType } from '@nestjs/graphql'
import { PagingInput } from '@pubkey-resolver/api-core-data-access'

@InputType()
export class IndexWalletUserFindManyInput extends PagingInput() {
  @Field()
  walletId!: string

  @Field({ nullable: true })
  search?: string
}
