import { IndexType, NetworkCluster } from '@pubkey-resolver/sdk'
import { ApiIndexDataCreateInput } from './api-index-data.service'

export const provisionIndexes: ApiIndexDataCreateInput[] = [
  {
    type: IndexType.SolanaCollection,
    address: 'SMBtHCCC6RYRutFEPb4gZqeBLUZbMNhRKaMKZZLHi7W',
    cluster: NetworkCluster.SolanaMainnet,
    label: 'SMB Gen 2',
  },
  {
    type: IndexType.SolanaCollection,
    address: 'HS1oygRKNBG1nMqjSmaBXSQqQ7apWr14gUU4pW3aDMCP',
    cluster: NetworkCluster.SolanaMainnet,
    label: 'SILICONS',
  },
  {
    type: IndexType.SolanaMint,
    address: 'DezXAZ8z7PnrnRJjz3wXBoRgixCa6xjnB7YaB1pPB263',
    cluster: NetworkCluster.SolanaMainnet,
    label: 'BONK',
  },
  {
    type: IndexType.SolanaMint,
    address: 'EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v',
    cluster: NetworkCluster.SolanaMainnet,
    label: 'USDC',
  },
  {
    type: IndexType.SolanaMint,
    address: '2kMpEJCZL8vEDZe7YPLMCS9Y3WKSAMedXBn7xHPvsWvi',
    cluster: NetworkCluster.SolanaMainnet,
    label: 'MOON',
  },
]
