import { Module } from '@nestjs/common'
import { ApiIndexWalletDataAccessModule } from '@pubkey-resolver/api-index-wallet-data-access'
import { ApiIndexWalletResolver } from './api-index-wallet.resolver'
import { ApiIndexWalletAdminResolver } from './api-index-wallet-admin.resolver'
import { ApiIndexWalletUserResolver } from './api-index-wallet-user.resolver'

@Module({
  imports: [ApiIndexWalletDataAccessModule],
  providers: [ApiIndexWalletResolver, ApiIndexWalletAdminResolver, ApiIndexWalletUserResolver],
})
export class ApiIndexWalletFeatureModule {}
