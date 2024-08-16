import { Injectable } from '@nestjs/common'
import { ApiIndexEntryDataService } from './api-index-entry-data.service'
import { ApiIndexEntryDataAdminService } from './api-index-entry-data-admin.service'
import { ApiIndexEntryDataUserService } from './api-index-entry-data-user.service'

@Injectable()
export class ApiIndexEntryService {
  constructor(
    readonly data: ApiIndexEntryDataService,
    readonly admin: ApiIndexEntryDataAdminService,
    readonly user: ApiIndexEntryDataUserService,
  ) {}
}
