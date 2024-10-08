import { UseGuards } from '@nestjs/common'
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { ApiAuthGraphQLUserGuard, CtxUserId } from '@pubkey-resolver/api-auth-data-access'
import {
  ApiUserService,
  User,
  UserUserFindManyInput,
  UserPaging,
  UserUserUpdateInput,
} from '@pubkey-resolver/api-user-data-access'

@Resolver()
@UseGuards(ApiAuthGraphQLUserGuard)
export class ApiUserUserResolver {
  constructor(private readonly service: ApiUserService) {}

  @Query(() => UserPaging)
  userFindManyUser(@Args('input') input: UserUserFindManyInput) {
    return this.service.user.findManyUser(input)
  }

  @Query(() => User, { nullable: true })
  userFindOneUser(@Args('username') username: string) {
    return this.service.user.findOneUser(username)
  }

  @Mutation(() => User, { nullable: true })
  userUpdateUser(@CtxUserId() userId: string, @Args('input') input: UserUserUpdateInput) {
    return this.service.user.updateUser(userId as string, input)
  }
}
