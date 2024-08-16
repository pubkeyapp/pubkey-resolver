import { Parent, ResolveField, Resolver } from '@nestjs/graphql'
import { IndexEntry } from '@pubkey-resolver/api-index-entry-data-access'

@Resolver(() => IndexEntry)
export class ApiIndexEntryResolver {
  @ResolveField(() => String, { nullable: true })
  label(@Parent() index: IndexEntry) {
    return index.label?.trim()?.length ? index.label : index.address
  }
}
