import { UseGuards } from '@nestjs/common'
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { ApiAuthGraphQLUserGuard, CtxUserId } from '@pubkey-resolver/api-auth-data-access'
import { ApiIdentityService, Identity, IdentityUserFindManyInput } from '@pubkey-resolver/api-identity-data-access'

@Resolver()
@UseGuards(ApiAuthGraphQLUserGuard)
export class ApiIdentityUserResolver {
  constructor(private readonly service: ApiIdentityService) {}

  @Mutation(() => Boolean, { nullable: true })
  userDeleteIdentity(@CtxUserId() userId: string, @Args('identityId') identityId: string) {
    return this.service.user.deleteIdentity(userId, identityId)
  }

  @Query(() => [Identity], { nullable: true })
  userFindManyIdentity(@Args('input') input: IdentityUserFindManyInput) {
    return this.service.user.findManyIdentity(input)
  }
}
