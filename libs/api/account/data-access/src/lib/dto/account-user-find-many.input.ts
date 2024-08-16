import { Field, InputType } from '@nestjs/graphql'
import { NetworkCluster, PagingInput } from '@pubkey-resolver/api-core-data-access'
import { AccountType } from '../entity/account-type.enum'

@InputType()
export class AccountUserFindManyInput extends PagingInput() {
  @Field({ nullable: true })
  search?: string
  @Field(() => NetworkCluster, { nullable: true })
  cluster?: NetworkCluster
  @Field(() => AccountType, { nullable: true })
  type?: AccountType
}
