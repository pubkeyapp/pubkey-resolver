import { UseGuards } from '@nestjs/common'
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { ApiAuthGraphQLAdminGuard } from '@pubkey-resolver/api-auth-data-access'
import {
  ApiIndexWalletService,
  IndexWallet,
  IndexWalletAdminFindManyInput,
  IndexWalletAdminUpdateInput,
  IndexWalletPaging,
} from '@pubkey-resolver/api-index-wallet-data-access'

@Resolver()
@UseGuards(ApiAuthGraphQLAdminGuard)
export class ApiIndexWalletAdminResolver {
  constructor(private readonly service: ApiIndexWalletService) {}

  @Mutation(() => Boolean, { nullable: true })
  adminDeleteIndexWallet(@Args('indexWalletId') indexWalletId: string) {
    return this.service.admin.deleteIndexWallet(indexWalletId)
  }

  @Query(() => IndexWalletPaging)
  adminFindManyIndexWallet(@Args('input') input: IndexWalletAdminFindManyInput) {
    return this.service.admin.findManyIndexWallet(input)
  }

  @Query(() => IndexWallet, { nullable: true })
  adminFindOneIndexWallet(@Args('indexWalletId') indexWalletId: string) {
    return this.service.admin.findOneIndexWallet(indexWalletId)
  }

  @Mutation(() => IndexWallet, { nullable: true })
  adminUpdateIndexWallet(
    @Args('indexWalletId') indexWalletId: string,
    @Args('input') input: IndexWalletAdminUpdateInput,
  ) {
    return this.service.admin.updateIndexWallet(indexWalletId, input)
  }
}
