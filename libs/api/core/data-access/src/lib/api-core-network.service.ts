import { dasApi } from '@metaplex-foundation/digital-asset-standard-api'
import { createUmi, Umi } from '@metaplex-foundation/umi'
import { web3JsRpc } from '@metaplex-foundation/umi-rpc-web3js'
import { Injectable, Logger } from '@nestjs/common'
import { OnEvent } from '@nestjs/event-emitter'
import { NetworkCluster } from '@prisma/client'
import { AccountInfo, Connection, ParsedAccountData, PublicKey } from '@solana/web3.js'
import { Helius, HeliusCluster } from 'helius-sdk'
import { CORE_APP_STARTED } from './api-core.events'
import { ApiCoreConfigService, NetworkClusterMap } from './config/api-core-config.service'

function heliusCluster(cluster: NetworkCluster): HeliusCluster {
  switch (cluster) {
    case NetworkCluster.SolanaMainnet:
      return 'mainnet-beta'
    case NetworkCluster.SolanaDevnet:
      return 'devnet'
    default:
      throw new Error(`HeliusCluster: Unsupported cluster: ${cluster}`)
  }
}

@Injectable()
export class ApiCoreNetworkService {
  private readonly logger = new Logger(ApiCoreNetworkService.name)
  private readonly connectionMap = new Map<NetworkCluster, Connection>()
  private readonly clusterMap: NetworkClusterMap = this.config.networkClusters
  private readonly helius: Map<NetworkCluster, Helius> = new Map()
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
        this.logger.debug(`[${cluster}] Connected to cluster ${cluster} version ${version['solana-core']}`)
      } catch (error) {
        this.logger.error(`[${cluster}] Error connecting to cluster, ${error}`)
      }
      // Helius SDK only supports devnet and mainnet
      if (this.config.heliusApiKey && ['SolanaDevnet', 'SolanaMainnet'].includes(cluster.toString())) {
        this.logger.debug(`[${cluster}] Helius SDK enabled for cluster`)
        this.helius.set(cluster as NetworkCluster, this.configureHelius(cluster as NetworkCluster))
        this.listWebhooks(cluster as NetworkCluster)
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

  ensureHelius(cluster: NetworkCluster): Helius {
    const found = this.getHelius(cluster)
    if (!found) {
      throw new Error(`Connection ${cluster} not found`)
    }
    return found
  }

  private configureHelius(cluster: NetworkCluster) {
    if (!this.config.heliusApiKey) {
      throw new Error('Helius API key not configured')
    }
    return new Helius(this.config.heliusApiKey as string, heliusCluster(cluster as NetworkCluster))
  }

  private getClusterEndpoint(cluster: NetworkCluster): string {
    return this.clusterMap[cluster]
  }

  private getConnection(cluster: NetworkCluster) {
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

  private getHelius(cluster: NetworkCluster) {
    if (!this.helius.has(cluster)) {
      this.helius.set(cluster, new Helius(this.config.heliusApiKey as string, heliusCluster(cluster)))
    }
    return this.helius.get(cluster)
  }

  private listWebhooks(cluster: NetworkCluster) {
    const helius = this.ensureHelius(cluster)
    helius
      .getAllWebhooks()
      .then((webhooks) => {
        this.logger.debug(`[${cluster}] Helius Webhooks: ${webhooks.length} configured`)
        for (const webhook of webhooks) {
          this.logger.debug(`[${cluster}] - Webhook: ${webhook.accountAddresses.length} addresses`)
        }
      })
      .catch((err) => {
        this.logger.error(`[${cluster}] Error listing webhooks: ${err}`)
      })
  }

  async getTokenAccountsByMint({
    cluster,
    wallet,
    programId,
    mint,
  }: {
    cluster: NetworkCluster
    wallet: string
    programId: string
    mint: string
  }) {
    const conn = this.getConnection(cluster)

    return conn
      .getParsedTokenAccountsByOwner(new PublicKey(wallet), {
        programId: new PublicKey(programId),
        mint: new PublicKey(mint),
      })
      .then((res) => res.value ?? [])
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

export type SolanaAccountInfo = AccountInfo<ParsedAccountData>
