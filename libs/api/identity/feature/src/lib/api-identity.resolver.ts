import { Parent, ResolveField, Resolver } from '@nestjs/graphql'
import { getIdentityUrl, Identity } from '@pubkey-resolver/api-identity-data-access'

@Resolver(() => Identity)
export class ApiIdentityResolver {
  @ResolveField(() => Boolean, { nullable: true })
  expired(@Parent() identity: Identity) {
    return !(identity.accessToken && identity.refreshToken)
  }

  @ResolveField(() => String, { nullable: true })
  name(@Parent() identity: Identity) {
    return identity.name ?? (identity.profile as { username?: string })?.username ?? identity?.providerId
  }

  @ResolveField(() => String, { nullable: true })
  url(@Parent() identity: Identity) {
    return getIdentityUrl(identity)
  }
}
