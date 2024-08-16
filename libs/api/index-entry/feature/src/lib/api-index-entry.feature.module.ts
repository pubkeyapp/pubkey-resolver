import { Module } from '@nestjs/common'
import { ApiIndexEntryDataAccessModule } from '@pubkey-resolver/api-index-entry-data-access'
import { ApiIndexEntryResolver } from './api-index-entry.resolver'
import { ApiIndexEntryAdminResolver } from './api-index-entry-admin.resolver'
import { ApiIndexEntryUserResolver } from './api-index-entry-user.resolver'

@Module({
  imports: [ApiIndexEntryDataAccessModule],
  providers: [ApiIndexEntryResolver, ApiIndexEntryAdminResolver, ApiIndexEntryUserResolver],
})
export class ApiIndexEntryFeatureModule {}
