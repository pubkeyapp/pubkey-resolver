import { Field, InputType } from '@nestjs/graphql'
import { NetworkCluster, PagingInput } from '@pubkey-resolver/api-core-data-access'

@InputType()
export class IndexEntryUserFindManyInput extends PagingInput() {
  @Field(() => NetworkCluster)
  cluster!: NetworkCluster
  @Field()
  indexAddress!: string
  @Field({ nullable: true })
  search?: string
}
