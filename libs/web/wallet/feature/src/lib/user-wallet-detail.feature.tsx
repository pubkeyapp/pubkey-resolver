import { Group } from '@mantine/core'
import { UserIndexWalletFeature } from '@pubkey-resolver/web-index-wallet-feature'
import { useUserFindOneWallet } from '@pubkey-resolver/web-wallet-data-access'
import { WalletUiItem } from '@pubkey-resolver/web-wallet-ui'
import { UiBack, UiDebugModal, UiError, UiLoader, UiPage, UiTabRoute, UiTabRoutes } from '@pubkey-ui/core'
import { useParams } from 'react-router-dom'
import { UserWalletDetailInfoTab } from './user-wallet-detail-info.tab'
import { UserWalletDetailSettingsTab } from './user-wallet-detail-settings.tab'

export default function UserWalletDetailFeature() {
  const { walletId } = useParams<{ walletId: string }>() as { walletId: string }
  const { item, query } = useUserFindOneWallet({ walletId })

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
      element: <UserWalletDetailInfoTab walletId={walletId} />,
    },
    {
      path: 'indexes',
      label: 'Indexes',
      element: <UserIndexWalletFeature walletId={walletId} />,
    },
    {
      path: 'settings',
      label: 'Settings',
      element: <UserWalletDetailSettingsTab walletId={walletId} />,
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
