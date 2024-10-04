import { UseGuards } from '@nestjs/common'
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { ApiAuthGraphQLUserGuard } from '@pubkey-resolver/api-auth-data-access'
import {
  ApiIndexWalletService,
  IndexWallet,
  IndexWalletPaging,
  IndexWalletUserFindManyInput,
  IndexWalletUserUpdateInput,
} from '@pubkey-resolver/api-index-wallet-data-access'

@Resolver()
@UseGuards(ApiAuthGraphQLUserGuard)
export class ApiIndexWalletUserResolver {
  constructor(private readonly service: ApiIndexWalletService) {}

  @Mutation(() => Boolean, { nullable: true })
  userDeleteIndexWallet(@Args('indexWalletId') indexWalletId: string) {
    return this.service.user.deleteIndexWallet(indexWalletId)
  }

  @Query(() => IndexWalletPaging)
  userFindManyIndexWallet(@Args('input') input: IndexWalletUserFindManyInput) {
    return this.service.user.findManyIndexWallet(input)
  }

  @Query(() => IndexWallet, { nullable: true })
  userFindOneIndexWallet(@Args('indexWalletId') indexWalletId: string) {
    return this.service.user.findOneIndexWallet(indexWalletId)
  }

  @Mutation(() => IndexWallet, { nullable: true })
  userUpdateIndexWallet(
    @Args('indexWalletId') indexWalletId: string,
    @Args('input') input: IndexWalletUserUpdateInput,
  ) {
    return this.service.user.updateIndexWallet(indexWalletId, input)
  }
}
