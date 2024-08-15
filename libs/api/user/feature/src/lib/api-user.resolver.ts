import { Parent, ResolveField, Resolver } from '@nestjs/graphql'
import { Identity } from '@pubkey-resolver/api-identity-data-access'
import { User } from '@pubkey-resolver/api-user-data-access'

@Resolver(() => User)
export class ApiUserResolver {
  @ResolveField(() => String, { nullable: true })
  avatarUrl(@Parent() user: User) {
    return user.avatarUrl?.length ? user.avatarUrl : null
  }

  @ResolveField(() => String)
  profileUrl(@Parent() user: User) {
    return ['/u', user.username].join('/')
  }

  @ResolveField(() => [Identity], { nullable: true })
  identities(@Parent() user: User) {
    return user.identities ?? []
  }
}
