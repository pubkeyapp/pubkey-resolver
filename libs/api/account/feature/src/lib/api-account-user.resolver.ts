import { UseGuards } from '@nestjs/common'
import { Args, Query, Resolver } from '@nestjs/graphql'
import {
  Account,
  AccountPaging,
  AccountUserFindManyInput,
  ApiAccountService,
} from '@pubkey-resolver/api-account-data-access'
import { ApiAuthGraphQLUserGuard } from '@pubkey-resolver/api-auth-data-access'

@Resolver()
@UseGuards(ApiAuthGraphQLUserGuard)
export class ApiAccountUserResolver {
  constructor(private readonly service: ApiAccountService) {}

  @Query(() => AccountPaging)
  userFindManyAccount(@Args('input') input: AccountUserFindManyInput) {
    return this.service.user.findManyAccount(input)
  }

  @Query(() => Account, { nullable: true })
  userFindOneAccount(@Args('accountId') accountId: string) {
    return this.service.user.findOneAccount(accountId)
  }
}
