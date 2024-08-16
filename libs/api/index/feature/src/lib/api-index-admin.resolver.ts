import { UseGuards } from '@nestjs/common'
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { ApiAuthGraphQLAdminGuard } from '@pubkey-resolver/api-auth-data-access'
import {
  ApiIndexService,
  Index,
  IndexAdminCreateInput,
  IndexAdminFindManyInput,
  IndexAdminResolveInput,
  IndexAdminUpdateInput,
  IndexPaging,
} from '@pubkey-resolver/api-index-data-access'
import { GraphQLJSON } from 'graphql-scalars'

@Resolver()
@UseGuards(ApiAuthGraphQLAdminGuard)
export class ApiIndexAdminResolver {
  constructor(private readonly service: ApiIndexService) {}

  @Mutation(() => Index, { nullable: true })
  adminCreateIndex(@Args('input') input: IndexAdminCreateInput) {
    return this.service.admin.createIndex(input)
  }

  @Mutation(() => Boolean, { nullable: true })
  adminDeleteIndex(@Args('indexId') indexId: string) {
    return this.service.admin.deleteIndex(indexId)
  }

  @Query(() => IndexPaging)
  adminFindManyIndex(@Args('input') input: IndexAdminFindManyInput) {
    return this.service.admin.findManyIndex(input)
  }

  @Query(() => Index, { nullable: true })
  adminFindOneIndex(@Args('indexId') indexId: string) {
    return this.service.admin.findOneIndex(indexId)
  }

  @Query(() => GraphQLJSON, { nullable: true })
  adminGetAccountInfo(@Args('input') input: IndexAdminResolveInput) {
    return this.service.resolver.getAccountInfo(input)
  }

  @Query(() => GraphQLJSON, { nullable: true })
  adminResolveIndex(@Args('input') input: IndexAdminResolveInput) {
    return this.service.resolver.resolveIndex(input)
  }

  @Query(() => GraphQLJSON, { nullable: true })
  adminResolveWallet(@Args('input') input: IndexAdminResolveInput, @Args('wallet') wallet: string) {
    return this.service.resolver.resolveWallet(input, wallet)
  }

  @Mutation(() => Index, { nullable: true })
  adminUpdateIndex(@Args('indexId') indexId: string, @Args('input') input: IndexAdminUpdateInput) {
    return this.service.admin.updateIndex(indexId, input)
  }
}
