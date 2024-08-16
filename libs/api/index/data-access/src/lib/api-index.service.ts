import { Injectable } from '@nestjs/common'
import { ApiIndexDataAdminService } from './api-index-data-admin.service'
import { ApiIndexDataUserService } from './api-index-data-user.service'
import { ApiIndexDataService } from './api-index-data.service'
import { ApiIndexResolverService } from './api-index-resolver.service'

@Injectable()
export class ApiIndexService {
  constructor(
    readonly admin: ApiIndexDataAdminService,
    readonly data: ApiIndexDataService,
    readonly resolver: ApiIndexResolverService,
    readonly user: ApiIndexDataUserService,
  ) {}
}
