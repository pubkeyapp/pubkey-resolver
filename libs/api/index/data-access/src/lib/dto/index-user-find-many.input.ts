import { Field, InputType } from '@nestjs/graphql'
import { NetworkCluster, PagingInput } from '@pubkey-resolver/api-core-data-access'
import { IndexType } from '../entity/index-type.enum'

@InputType()
export class IndexUserFindManyInput extends PagingInput() {
  @Field({ nullable: true })
  search?: string
  @Field(() => NetworkCluster, { nullable: true })
  cluster?: NetworkCluster
  @Field(() => IndexType, { nullable: true })
  type?: IndexType
}
