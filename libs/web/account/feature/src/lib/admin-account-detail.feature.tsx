import { Group } from '@mantine/core'
import { UiBack, UiDebugModal, UiError, UiLoader, UiPage, UiTabRoute, UiTabRoutes } from '@pubkey-ui/core'
import { useAdminFindOneAccount } from '@pubkey-resolver/web-account-data-access'
import { AccountUiItem } from '@pubkey-resolver/web-account-ui'
import { useParams } from 'react-router-dom'
import { AdminAccountDetailInfoTab } from './admin-account-detail-info.tab'
import { AdminAccountDetailSettingsTab } from './admin-account-detail-settings.tab'

export default function AdminAccountDetailFeature() {
  const { accountId } = useParams<{ accountId: string }>() as { accountId: string }
  const { item, query } = useAdminFindOneAccount({ accountId })

  if (query.isLoading) {
    return <UiLoader />
  }
  if (!item) {
    return <UiError message="Account not found." />
  }

  const tabs: UiTabRoute[] = [
    {
      path: 'info',
      label: 'Info',
      element: <AdminAccountDetailInfoTab accountId={accountId} />,
    },
    {
      path: 'settings',
      label: 'Settings',
      element: <AdminAccountDetailSettingsTab accountId={accountId} />,
    },
  ]

  return (
    <UiPage
      title={<AccountUiItem account={item} />}
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
