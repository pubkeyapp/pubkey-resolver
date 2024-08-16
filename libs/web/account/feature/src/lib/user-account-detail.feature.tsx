import { Group } from '@mantine/core'
import { useUserFindOneAccount } from '@pubkey-resolver/web-account-data-access'
import { AccountUiItem } from '@pubkey-resolver/web-account-ui'
import { UiBack, UiDebugModal, UiError, UiLoader, UiPage, UiTabRoute, UiTabRoutes } from '@pubkey-ui/core'
import { useParams } from 'react-router-dom'
import { UserAccountDetailInfoTab } from './user-account-detail-info.tab'

export default function UserAccountDetailFeature() {
  const { accountId } = useParams<{ accountId: string }>() as { accountId: string }
  const { item, query } = useUserFindOneAccount({ accountId })

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
      element: <UserAccountDetailInfoTab accountId={accountId} />,
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
