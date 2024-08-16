import { Field, InputType } from '@nestjs/graphql'
import { NetworkCluster } from '@pubkey-resolver/api-core-data-access'

@InputType()
export class AccountAdminResolveInput {
  @Field(() => NetworkCluster)
  cluster!: NetworkCluster

  @Field()
  address!: string
}
