import { Module } from '@nestjs/common'
import { ApiAccountFeatureModule } from '@pubkey-resolver/api-account-feature'
import { ApiAuthFeatureModule } from '@pubkey-resolver/api-auth-feature'
import { ApiCoreDataAccessModule } from '@pubkey-resolver/api-core-data-access'
import { ApiIdentityFeatureModule } from '@pubkey-resolver/api-identity-feature'
import { ApiUserFeatureModule } from '@pubkey-resolver/api-user-feature'
import { ApiCoreController } from './api-core.controller'
import { ApiCoreResolver } from './api-core.resolver'

const imports = [
  // The api-feature generator will add the imports here
  ApiAuthFeatureModule,
  ApiCoreDataAccessModule,
  ApiIdentityFeatureModule,
  ApiUserFeatureModule,
  ApiAccountFeatureModule,
]

@Module({
  controllers: [ApiCoreController],
  imports: [...imports],
  providers: [ApiCoreResolver],
})
export class ApiCoreFeatureModule {}
