import { Field, InputType } from '@nestjs/graphql'
import { NetworkCluster } from '@pubkey-resolver/api-core-data-access'
import { AccountType } from '../entity/account-type.enum'

@InputType()
export class AccountAdminCreateInput {
  @Field(() => AccountType)
  type!: AccountType

  @Field(() => NetworkCluster)
  cluster!: NetworkCluster

  @Field()
  address!: string

  @Field({ nullable: true })
  label?: string
}
