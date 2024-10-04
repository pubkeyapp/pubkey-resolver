import { Injectable } from '@nestjs/common'
import { ApiIndexWalletDataService } from './api-index-wallet-data.service'
import { ApiIndexWalletDataAdminService } from './api-index-wallet-data-admin.service'
import { ApiIndexWalletDataUserService } from './api-index-wallet-data-user.service'

@Injectable()
export class ApiIndexWalletService {
  constructor(
    readonly data: ApiIndexWalletDataService,
    readonly admin: ApiIndexWalletDataAdminService,
    readonly user: ApiIndexWalletDataUserService,
  ) {}
}
