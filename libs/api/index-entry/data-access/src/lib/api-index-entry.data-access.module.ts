import { Module } from '@nestjs/common'
import { ApiCoreDataAccessModule } from '@pubkey-resolver/api-core-data-access'
import { ApiIndexEntryService } from './api-index-entry.service'
import { ApiIndexEntryDataService } from './api-index-entry-data.service'
import { ApiIndexEntryDataAdminService } from './api-index-entry-data-admin.service'
import { ApiIndexEntryDataUserService } from './api-index-entry-data-user.service'

@Module({
  imports: [ApiCoreDataAccessModule],
  providers: [
    ApiIndexEntryService,
    ApiIndexEntryDataService,
    ApiIndexEntryDataAdminService,
    ApiIndexEntryDataUserService,
  ],
  exports: [ApiIndexEntryService],
})
export class ApiIndexEntryDataAccessModule {}
