import { Field, InputType } from '@nestjs/graphql'
import { NetworkCluster } from '@pubkey-resolver/api-core-data-access'
import { IndexType } from '../entity/index-type.enum'

@InputType()
export class IndexAdminCreateInput {
  @Field(() => IndexType)
  type!: IndexType

  @Field(() => NetworkCluster)
  cluster!: NetworkCluster

  @Field()
  address!: string

  @Field({ nullable: true })
  label?: string
}
