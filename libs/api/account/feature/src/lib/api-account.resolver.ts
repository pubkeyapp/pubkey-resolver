import { Parent, ResolveField, Resolver } from '@nestjs/graphql'
import { Account } from '@pubkey-resolver/api-account-data-access'

@Resolver(() => Account)
export class ApiAccountResolver {
  @ResolveField(() => String, { nullable: true })
  label(@Parent() account: Account) {
    return account.label?.trim()?.length ? account.label : account.address
  }
}
