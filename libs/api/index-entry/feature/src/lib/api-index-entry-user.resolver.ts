import { UseGuards } from '@nestjs/common'
import { Args, Query, Resolver } from '@nestjs/graphql'
import { ApiAuthGraphQLUserGuard } from '@pubkey-resolver/api-auth-data-access'
import {
  ApiIndexEntryService,
  IndexEntry,
  IndexEntryPaging,
  IndexEntryUserFindManyInput,
} from '@pubkey-resolver/api-index-entry-data-access'

@Resolver()
@UseGuards(ApiAuthGraphQLUserGuard)
export class ApiIndexEntryUserResolver {
  constructor(private readonly service: ApiIndexEntryService) {}

  @Query(() => IndexEntryPaging)
  userFindManyIndexEntry(@Args('input') input: IndexEntryUserFindManyInput) {
    return this.service.user.findManyIndexEntry(input)
  }

  @Query(() => IndexEntry, { nullable: true })
  userFindOneIndexEntry(@Args('indexEntryId') indexEntryId: string) {
    return this.service.user.findOneIndexEntry(indexEntryId)
  }
}
