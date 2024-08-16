import { Module } from '@nestjs/common'
import { ApiCoreDataAccessModule } from '@pubkey-resolver/api-core-data-access'
import { ApiAccountDataAdminService } from './api-account-data-admin.service'
import { ApiAccountDataUserService } from './api-account-data-user.service'
import { ApiAccountDataService } from './api-account-data.service'
import { ApiAccountProvisionService } from './api-account-provision.service'
import { ApiAccountResolverService } from './api-account-resolver.service'
import { ApiAccountService } from './api-account.service'

@Module({
  imports: [ApiCoreDataAccessModule],
  providers: [
    ApiAccountService,
    ApiAccountDataService,
    ApiAccountDataAdminService,
    ApiAccountDataUserService,
    ApiAccountProvisionService,
    ApiAccountResolverService,
  ],
  exports: [ApiAccountService],
})
export class ApiAccountDataAccessModule {}
