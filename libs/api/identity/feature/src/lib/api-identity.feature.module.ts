import { Module } from '@nestjs/common'
import { ApiIdentityDataAccessModule } from '@pubkey-resolver/api-identity-data-access'
import { ApiIdentityAdminResolver } from './api-identity-admin.resolver'
import { ApiIdentityUserResolver } from './api-identity-user.resolver'
import { ApiIdentityResolver } from './api-identity.resolver'

@Module({
  imports: [ApiIdentityDataAccessModule],
  providers: [ApiIdentityAdminResolver, ApiIdentityResolver, ApiIdentityUserResolver],
})
export class ApiIdentityFeatureModule {}
