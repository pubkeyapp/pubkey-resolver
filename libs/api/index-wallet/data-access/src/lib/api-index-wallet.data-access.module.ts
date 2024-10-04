import { Module } from '@nestjs/common'
import { ApiCoreDataAccessModule } from '@pubkey-resolver/api-core-data-access'
import { ApiIndexWalletService } from './api-index-wallet.service'
import { ApiIndexWalletDataService } from './api-index-wallet-data.service'
import { ApiIndexWalletDataAdminService } from './api-index-wallet-data-admin.service'
import { ApiIndexWalletDataUserService } from './api-index-wallet-data-user.service'

@Module({
  imports: [ApiCoreDataAccessModule],
  providers: [
    ApiIndexWalletService,
    ApiIndexWalletDataService,
    ApiIndexWalletDataAdminService,
    ApiIndexWalletDataUserService,
  ],
  exports: [ApiIndexWalletService],
})
export class ApiIndexWalletDataAccessModule {}
