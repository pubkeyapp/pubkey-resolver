import { UseGuards } from '@nestjs/common'
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import {
  Account,
  AccountAdminCreateInput,
  AccountAdminFindManyInput,
  AccountAdminResolveInput,
  AccountAdminUpdateInput,
  AccountPaging,
  ApiAccountService,
} from '@pubkey-resolver/api-account-data-access'
import { ApiAuthGraphQLAdminGuard } from '@pubkey-resolver/api-auth-data-access'
import { GraphQLJSON } from 'graphql-scalars'

@Resolver()
@UseGuards(ApiAuthGraphQLAdminGuard)
export class ApiAccountAdminResolver {
  constructor(private readonly service: ApiAccountService) {}

  @Mutation(() => Account, { nullable: true })
  adminCreateAccount(@Args('input') input: AccountAdminCreateInput) {
    return this.service.admin.createAccount(input)
  }

  @Mutation(() => Boolean, { nullable: true })
  adminDeleteAccount(@Args('accountId') accountId: string) {
    return this.service.admin.deleteAccount(accountId)
  }

  @Query(() => AccountPaging)
  adminFindManyAccount(@Args('input') input: AccountAdminFindManyInput) {
    return this.service.admin.findManyAccount(input)
  }

  @Query(() => Account, { nullable: true })
  adminFindOneAccount(@Args('accountId') accountId: string) {
    return this.service.admin.findOneAccount(accountId)
  }

  @Query(() => GraphQLJSON, { nullable: true })
  adminGetAccountInfo(@Args('input') input: AccountAdminResolveInput) {
    return this.service.resolver.getAccountInfo(input)
  }

  @Query(() => GraphQLJSON, { nullable: true })
  adminResolveAccount(@Args('input') input: AccountAdminResolveInput) {
    return this.service.resolver.resolveAccount(input)
  }

  @Query(() => GraphQLJSON, { nullable: true })
  adminResolveWallet(@Args('input') input: AccountAdminResolveInput) {
    return this.service.resolver.resolveWallet(input)
  }

  @Mutation(() => Account, { nullable: true })
  adminUpdateAccount(@Args('accountId') accountId: string, @Args('input') input: AccountAdminUpdateInput) {
    return this.service.admin.updateAccount(accountId, input)
  }
}
