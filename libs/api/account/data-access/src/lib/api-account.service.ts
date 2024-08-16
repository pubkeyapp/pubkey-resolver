import { Injectable } from '@nestjs/common'
import { ApiAccountDataAdminService } from './api-account-data-admin.service'
import { ApiAccountDataUserService } from './api-account-data-user.service'
import { ApiAccountDataService } from './api-account-data.service'
import { ApiAccountResolverService } from './api-account-resolver.service'

@Injectable()
export class ApiAccountService {
  constructor(
    readonly admin: ApiAccountDataAdminService,
    readonly data: ApiAccountDataService,
    readonly resolver: ApiAccountResolverService,
    readonly user: ApiAccountDataUserService,
  ) {}
}
