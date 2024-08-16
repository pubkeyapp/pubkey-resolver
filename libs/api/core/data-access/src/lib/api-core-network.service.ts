import { dasApi } from '@metaplex-foundation/digital-asset-standard-api'
import { createUmi, Umi } from '@metaplex-foundation/umi'
import { web3JsRpc } from '@metaplex-foundation/umi-rpc-web3js'
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
  private readonly umis: Map<NetworkCluster, Umi> = new Map()
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
    const connection = this.connectionMap.get(cluster)
    if (!connection) {
      throw new Error(`getConnection: Error getting connection for cluster: ${cluster}`)
    }
    return connection
  }

  getUmi(cluster: NetworkCluster) {
    if (!this.umis.has(cluster)) {
      const endpoint = this.ensureClusterEndpoint(cluster)
      this.umis.set(cluster, createUmi().use(web3JsRpc(endpoint, 'confirmed')).use(dasApi()))
      this.logger.verbose(`getUmi: Network created for cluster: ${cluster}`)
    }
    const umi = this.umis.get(cluster)
    if (!umi) {
      throw new Error(`getUmi: Error getting network for cluster: ${cluster}`)
    }
    return umi
  }
}
