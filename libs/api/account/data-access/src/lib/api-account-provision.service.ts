import { Injectable, Logger } from '@nestjs/common'
import { OnEvent } from '@nestjs/event-emitter'
import { Prisma } from '@prisma/client'
import { ApiCoreService, CORE_APP_STARTED } from '@pubkey-resolver/api-core-data-access'
import { ApiAccountDataService } from './api-account-data.service'
import { provisionAccounts } from './api-account-provision-data'

@Injectable()
export class ApiAccountProvisionService {
  private readonly logger = new Logger(ApiAccountProvisionService.name)

  constructor(private readonly core: ApiCoreService, private readonly data: ApiAccountDataService) {}

  @OnEvent(CORE_APP_STARTED)
  async onApplicationStarted() {
    if (this.core.config.databaseProvision) {
      await this.provisionAccounts()
      this.logger.verbose(`Provisioned database`)
    }
  }

  private async provisionAccounts() {
    await Promise.all(provisionAccounts.map((account) => this.provisionAccount(account)))
  }

  private async provisionAccount(input: Prisma.AccountCreateInput) {
    const found = await this.data.findClusterAddress({ address: input.address, cluster: input.cluster })
    if (!found) {
      await this.data.create(input)
      this.logger.verbose(`Provisioned ${input.cluster} ${input.address}`)
      return
    }
    this.logger.verbose(`Found existing ${input.cluster} ${input.address}`)
  }
}
