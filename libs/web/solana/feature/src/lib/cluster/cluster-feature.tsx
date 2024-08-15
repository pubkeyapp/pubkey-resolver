import { SolanaUiClusterModalAdd, SolanaUiClusterUiTable } from '@pubkey-resolver/web-solana-ui'
import { UiPage } from '@pubkey-ui/core'

export default function ClusterFeature() {
  return (
    <UiPage title="Clusters" rightAction={<SolanaUiClusterModalAdd />}>
      <SolanaUiClusterUiTable />
    </UiPage>
  )
}
