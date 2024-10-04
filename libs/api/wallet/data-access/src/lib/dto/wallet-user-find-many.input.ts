import { Field, InputType } from '@nestjs/graphql'
import { PagingInput } from '@pubkey-resolver/api-core-data-access'

@InputType()
export class WalletUserFindManyInput extends PagingInput() {
  @Field({ nullable: true })
  search?: string
}
