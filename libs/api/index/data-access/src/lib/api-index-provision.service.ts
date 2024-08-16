import { Injectable, Logger } from '@nestjs/common'
import { OnEvent } from '@nestjs/event-emitter'
import { ApiCoreService, CORE_APP_STARTED } from '@pubkey-resolver/api-core-data-access'
import { ApiIndexDataCreateInput, ApiIndexDataService } from './api-index-data.service'
import { provisionIndexes } from './api-index-provision-data'

@Injectable()
export class ApiIndexProvisionService {
  private readonly logger = new Logger(ApiIndexProvisionService.name)

  constructor(private readonly core: ApiCoreService, private readonly data: ApiIndexDataService) {}

  @OnEvent(CORE_APP_STARTED)
  async onApplicationStarted() {
    if (this.core.config.databaseProvision) {
      await this.provisionIndexes()
      this.logger.verbose(`Provisioned database`)
    }
  }

  private async provisionIndexes() {
    await Promise.all(provisionIndexes.map((index) => this.provisionIndex(index)))
  }

  private async provisionIndex(input: ApiIndexDataCreateInput) {
    const found = await this.data.findClusterAddress({ address: input.address, cluster: input.cluster })
    if (!found) {
      await this.data.create(input)
      this.logger.verbose(`Provisioned ${input.cluster} ${input.address}`)
      return
    }
    this.logger.verbose(`Found existing ${input.cluster} ${input.address}`)
  }
}
