import { UseGuards } from '@nestjs/common'
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { ApiAuthGraphQLAdminGuard } from '@pubkey-resolver/api-auth-data-access'
import {
  UserAdminCreateInput,
  UserAdminFindManyInput,
  UserAdminUpdateInput,
  ApiUserService,
  User,
  UserPaging,
} from '@pubkey-resolver/api-user-data-access'

@Resolver()
@UseGuards(ApiAuthGraphQLAdminGuard)
export class ApiUserAdminResolver {
  constructor(private readonly service: ApiUserService) {}

  @Mutation(() => User, { nullable: true })
  adminCreateUser(@Args('input') input: UserAdminCreateInput) {
    return this.service.admin.createUser(input)
  }

  @Mutation(() => Boolean, { nullable: true })
  adminDeleteUser(@Args('userId') userId: string) {
    return this.service.admin.deleteUser(userId)
  }

  @Query(() => UserPaging)
  adminFindManyUser(@Args('input') input: UserAdminFindManyInput) {
    return this.service.admin.findManyUser(input)
  }

  @Query(() => User, { nullable: true })
  adminFindOneUser(@Args('userId') userId: string) {
    return this.service.admin.findOneUser(userId)
  }

  @Mutation(() => User, { nullable: true })
  adminUpdateUser(@Args('userId') userId: string, @Args('input') input: UserAdminUpdateInput) {
    return this.service.admin.updateUser(userId, input)
  }
}
