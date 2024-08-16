import { Module } from '@nestjs/common'
import { ApiAuthDataAccessModule } from '@pubkey-resolver/api-auth-data-access'
import { ApiCoreDataAccessModule } from '@pubkey-resolver/api-core-data-access'
import { ApiIdentityDataAdminService } from './api-identity-data-admin.service'
import { ApiIdentityDataUserService } from './api-identity-data-user.service'
import { ApiIdentityService } from './api-identity.service'

@Module({
  imports: [ApiAuthDataAccessModule, ApiCoreDataAccessModule],
  providers: [ApiIdentityDataAdminService, ApiIdentityService, ApiIdentityDataUserService],
  exports: [ApiIdentityService],
})
export class ApiIdentityDataAccessModule {}
