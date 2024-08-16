import { Module } from '@nestjs/common'
import { ApiCoreDataAccessModule } from '@pubkey-resolver/api-core-data-access'
import { ApiIndexEntryDataAccessModule } from '@pubkey-resolver/api-index-entry-data-access'
import { ApiIndexDataAdminService } from './api-index-data-admin.service'
import { ApiIndexDataUserService } from './api-index-data-user.service'
import { ApiIndexDataService } from './api-index-data.service'
import { ApiIndexProvisionService } from './api-index-provision.service'
import { ApiIndexResolverService } from './api-index-resolver.service'
import { ApiIndexService } from './api-index.service'

@Module({
  imports: [ApiCoreDataAccessModule, ApiIndexEntryDataAccessModule],
  providers: [
    ApiIndexService,
    ApiIndexDataService,
    ApiIndexDataAdminService,
    ApiIndexDataUserService,
    ApiIndexProvisionService,
    ApiIndexResolverService,
  ],
  exports: [ApiIndexService],
})
export class ApiIndexDataAccessModule {}
