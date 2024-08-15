import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql'
import { BaseContext } from '@pubkey-resolver/api-core-data-access'
import {
  ApiIdentityService,
  IdentityChallenge,
  IdentityRequestChallengeInput,
  IdentityVerifyChallengeInput,
} from '@pubkey-resolver/api-identity-data-access'

@Resolver()
export class ApiIdentityAnonResolver {
  constructor(private readonly service: ApiIdentityService) {}

  @Query(() => IdentityChallenge, { nullable: true })
  anonRequestIdentityChallenge(@Context() ctx: BaseContext, @Args('input') input: IdentityRequestChallengeInput) {
    return this.service.anon.requestIdentityChallenge(ctx, input)
  }

  @Mutation(() => IdentityChallenge, { nullable: true })
  anonVerifyIdentityChallenge(@Context() ctx: BaseContext, @Args('input') input: IdentityVerifyChallengeInput) {
    return this.service.anon.verifyIdentityChallenge(ctx, input)
  }
}
