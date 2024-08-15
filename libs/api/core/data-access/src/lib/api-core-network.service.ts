import { Injectable, Logger } from '@nestjs/common'
import { OnEvent } from '@nestjs/event-emitter'
import { NetworkCluster } from '@prisma/client'
import { Connection } from '@solana/web3.js'
import { CORE_APP_STARTED } from './api-core.events'
import { ApiCoreConfigService, NetworkClusterMap } from './config/api-core-config.service'

@Injectable()
export class ApiCoreNetworkService {
  private readonly logger = new Logger(ApiCoreNetworkService.name)
  private readonly connectionMap = new Map<NetworkCluster, Connection>()
  private readonly clusterMap: NetworkClusterMap = this.config.networkClusters
  constructor(readonly config: ApiCoreConfigService) {}

  @OnEvent(CORE_APP_STARTED)
  async onApplicationStarted() {
    if (!Object.keys(this.clusterMap).length) {
      this.logger.error('No network clusters found. Configure at least one network cluster using the env variables.')
      process.exit(1)
    }
    for (const cluster of Object.keys(this.clusterMap)) {
      const connection = this.ensureConnection(cluster as NetworkCluster)
      try {
        const version = await connection.getVersion()
        this.logger.debug(`Connected to ${cluster} cluster, version ${version['solana-core']}`)
      } catch (error) {
        this.logger.error(`Error connecting to ${cluster} cluster, ${error}`)
      }
    }
  }

  ensureClusterEndpoint(cluster: NetworkCluster): string {
    const found = this.getClusterEndpoint(cluster)
    if (!found) {
      throw new Error(`Cluster ${cluster} not found`)
    }
    return found
  }

  ensureConnection(cluster: NetworkCluster): Connection {
    const found = this.getConnection(cluster)
    if (!found) {
      throw new Error(`Connection ${cluster} not found`)
    }
    return found
  }

  getClusterEndpoint(cluster: NetworkCluster): string {
    return this.clusterMap[cluster]
  }

  getConnection(cluster: NetworkCluster) {
    if (!this.connectionMap.has(cluster)) {
      const endpoint = this.ensureClusterEndpoint(cluster)
      this.connectionMap.set(cluster, new Connection(endpoint, 'confirmed'))
    }
    return this.connectionMap.get(cluster)
  }
}
