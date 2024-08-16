import { Module } from '@nestjs/common'
import { ApiIndexDataAccessModule } from '@pubkey-resolver/api-index-data-access'
import { ApiIndexResolver } from './api-index.resolver'
import { ApiIndexAdminResolver } from './api-index-admin.resolver'
import { ApiIndexUserResolver } from './api-index-user.resolver'

@Module({
  imports: [ApiIndexDataAccessModule],
  providers: [ApiIndexResolver, ApiIndexAdminResolver, ApiIndexUserResolver],
})
export class ApiIndexFeatureModule {}
