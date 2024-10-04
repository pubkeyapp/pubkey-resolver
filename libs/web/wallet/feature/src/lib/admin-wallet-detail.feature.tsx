import { Group } from '@mantine/core'
import { AdminIndexWalletFeature } from '@pubkey-resolver/web-index-wallet-feature'
import { useAdminFindOneWallet } from '@pubkey-resolver/web-wallet-data-access'
import { WalletUiItem } from '@pubkey-resolver/web-wallet-ui'
import { UiBack, UiDebugModal, UiError, UiLoader, UiPage, UiTabRoute, UiTabRoutes } from '@pubkey-ui/core'
import { useParams } from 'react-router-dom'
import { AdminWalletDetailInfoTab } from './admin-wallet-detail-info.tab'
import { AdminWalletDetailSettingsTab } from './admin-wallet-detail-settings.tab'

export default function AdminWalletDetailFeature() {
  const { walletId } = useParams<{ walletId: string }>() as { walletId: string }
  const { item, query } = useAdminFindOneWallet({ walletId })

  if (query.isLoading) {
    return <UiLoader />
  }
  if (!item) {
    return <UiError message="Wallet not found." />
  }

  const tabs: UiTabRoute[] = [
    {
      path: 'info',
      label: 'Info',
      element: <AdminWalletDetailInfoTab walletId={walletId} />,
    },
    {
      path: 'indexes',
      label: 'Indexes',
      element: <AdminIndexWalletFeature walletId={walletId} />,
    },
    {
      path: 'settings',
      label: 'Settings',
      element: <AdminWalletDetailSettingsTab walletId={walletId} />,
    },
  ]

  return (
    <UiPage
      title={<WalletUiItem wallet={item} />}
      leftAction={<UiBack />}
      rightAction={
        <Group>
          <UiDebugModal data={item} />
        </Group>
      }
    >
      <UiTabRoutes tabs={tabs} />
    </UiPage>
  )
}
