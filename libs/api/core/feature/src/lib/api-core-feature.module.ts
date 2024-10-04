import { Module } from '@nestjs/common'
import { ApiAuthFeatureModule } from '@pubkey-resolver/api-auth-feature'
import { ApiCoreDataAccessModule } from '@pubkey-resolver/api-core-data-access'
import { ApiIdentityFeatureModule } from '@pubkey-resolver/api-identity-feature'
import { ApiIndexEntryFeatureModule } from '@pubkey-resolver/api-index-entry-feature'
import { ApiIndexFeatureModule } from '@pubkey-resolver/api-index-feature'
import { ApiUserFeatureModule } from '@pubkey-resolver/api-user-feature'
import { ApiWalletFeatureModule } from '@pubkey-resolver/api-wallet-feature'
import { ApiCoreController } from './api-core.controller'
import { ApiCoreResolver } from './api-core.resolver'
import { ApiIndexWalletFeatureModule } from '@pubkey-resolver/api-index-wallet-feature'

const imports = [
  // The api-feature generator will add the imports here
  ApiAuthFeatureModule,
  ApiCoreDataAccessModule,
  ApiIdentityFeatureModule,
  ApiUserFeatureModule,
  ApiIndexFeatureModule,
  ApiIndexEntryFeatureModule,
  ApiWalletFeatureModule,
  ApiIndexWalletFeatureModule,
]

@Module({
  controllers: [ApiCoreController],
  imports: [...imports],
  providers: [ApiCoreResolver],
})
export class ApiCoreFeatureModule {}
