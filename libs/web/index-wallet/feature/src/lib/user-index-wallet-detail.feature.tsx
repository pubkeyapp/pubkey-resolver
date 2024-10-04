import { Group } from '@mantine/core'
import { IndexUiItem } from '@pubkey-resolver/web-index-ui'
import { useUserFindOneIndexWallet } from '@pubkey-resolver/web-index-wallet-data-access'
import { UiBack, UiDebugModal, UiError, UiLoader, UiPage, UiTabRoute, UiTabRoutes } from '@pubkey-ui/core'
import { useParams } from 'react-router-dom'
import { UserIndexWalletDetailInfoTab } from './user-index-wallet-detail-info.tab'
import { UserIndexWalletDetailSettingsTab } from './user-index-wallet-detail-settings.tab'

export default function UserIndexWalletDetailFeature() {
  const { indexWalletId } = useParams<{ indexWalletId: string }>() as { indexWalletId: string }
  const { item, query } = useUserFindOneIndexWallet({ indexWalletId })

  if (query.isLoading) {
    return <UiLoader />
  }
  if (!item) {
    return <UiError message="IndexWallet not found." />
  }

  const tabs: UiTabRoute[] = [
    {
      path: 'info',
      label: 'Info',
      element: <UserIndexWalletDetailInfoTab indexWalletId={indexWalletId} />,
    },
    {
      path: 'settings',
      label: 'Settings',
      element: <UserIndexWalletDetailSettingsTab indexWalletId={indexWalletId} />,
    },
  ]

  return (
    <UiPage
      title={item.index ? <IndexUiItem index={item.index} /> : null}
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
