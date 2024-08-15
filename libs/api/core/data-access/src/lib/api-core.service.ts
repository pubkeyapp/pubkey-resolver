import { Injectable } from '@nestjs/common'
import { EventEmitter2 } from '@nestjs/event-emitter'
import { IdentityProvider } from '@prisma/client'
import { Cache, createCache } from '@pubkey-resolver/cache'
import { ApiCoreNetworkService } from './api-core-network.service'
import { ApiCorePrismaClient, prismaClient } from './api-core-prisma-client'
import { ApiCoreConfigService } from './config/api-core-config.service'
import { slugifyId } from './helpers/slugify-id'
import { getEnvEnvTemplate } from './templates/get-env-env-template'

@Injectable()
export class ApiCoreService {
  readonly data: ApiCorePrismaClient = prismaClient
  readonly cache: Cache = createCache({ base: this.config.cacheBasePath })
  constructor(
    readonly config: ApiCoreConfigService,
    readonly eventEmitter: EventEmitter2,
    readonly network: ApiCoreNetworkService,
  ) {}

  async findUserByIdentity({ provider, providerId }: { provider: IdentityProvider; providerId: string }) {
    return this.data.identity.findUnique({
      where: { provider_providerId: { provider, providerId } },
      include: { owner: true },
    })
  }

  async findUsername(username: string): Promise<string> {
    username = slugifyId(username)
    const exists = await this.data.user.findUnique({ where: { username } })
    if (!exists) {
      return username
    }
    const newUsername = `${username}-${Math.floor(Math.random() * 1000)}`
    return this.findUsername(newUsername)
  }

  uptime() {
    return process.uptime()
  }

  envJs() {
    return getEnvEnvTemplate(this.envJson())
  }
  envJson() {
    return this.config.appConfig
  }
}
