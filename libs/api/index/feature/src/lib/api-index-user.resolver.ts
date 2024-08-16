import { UseGuards } from '@nestjs/common'
import { Args, Query, Resolver } from '@nestjs/graphql'
import {
  Index,
  IndexPaging,
  IndexUserFindManyInput,
  ApiIndexService,
} from '@pubkey-resolver/api-index-data-access'
import { ApiAuthGraphQLUserGuard } from '@pubkey-resolver/api-auth-data-access'

@Resolver()
@UseGuards(ApiAuthGraphQLUserGuard)
export class ApiIndexUserResolver {
  constructor(private readonly service: ApiIndexService) {}

  @Query(() => IndexPaging)
  userFindManyIndex(@Args('input') input: IndexUserFindManyInput) {
    return this.service.user.findManyIndex(input)
  }

  @Query(() => Index, { nullable: true })
  userFindOneIndex(@Args('indexId') indexId: string) {
    return this.service.user.findOneIndex(indexId)
  }
}
