import { UseGuards } from '@nestjs/common'
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { ApiAuthGraphQLAdminGuard } from '@pubkey-resolver/api-auth-data-access'
import {
  ApiIndexEntryService,
  IndexEntry,
  IndexEntryAdminFindManyInput,
  IndexEntryPaging,
} from '@pubkey-resolver/api-index-entry-data-access'

@Resolver()
@UseGuards(ApiAuthGraphQLAdminGuard)
export class ApiIndexEntryAdminResolver {
  constructor(private readonly service: ApiIndexEntryService) {}

  @Mutation(() => Boolean, { nullable: true })
  adminDeleteIndexEntry(@Args('indexEntryId') indexEntryId: string) {
    return this.service.admin.deleteIndexEntry(indexEntryId)
  }

  @Query(() => IndexEntryPaging)
  adminFindManyIndexEntry(@Args('input') input: IndexEntryAdminFindManyInput) {
    return this.service.admin.findManyIndexEntry(input)
  }

  @Query(() => IndexEntry, { nullable: true })
  adminFindOneIndexEntry(@Args('indexEntryId') indexEntryId: string) {
    return this.service.admin.findOneIndexEntry(indexEntryId)
  }
}
