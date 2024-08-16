import { Module } from '@nestjs/common'
import { ApiAccountDataAccessModule } from '@pubkey-resolver/api-account-data-access'
import { ApiAccountResolver } from './api-account.resolver'
import { ApiAccountAdminResolver } from './api-account-admin.resolver'
import { ApiAccountUserResolver } from './api-account-user.resolver'

@Module({
  imports: [ApiAccountDataAccessModule],
  providers: [ApiAccountResolver, ApiAccountAdminResolver, ApiAccountUserResolver],
})
export class ApiAccountFeatureModule {}
