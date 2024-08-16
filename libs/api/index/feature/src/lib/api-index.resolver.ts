import { Parent, ResolveField, Resolver } from '@nestjs/graphql'
import { Index } from '@pubkey-resolver/api-index-data-access'

@Resolver(() => Index)
export class ApiIndexResolver {
  @ResolveField(() => String, { nullable: true })
  label(@Parent() index: Index) {
    return index.label?.trim()?.length ? index.label : index.address
  }
}
