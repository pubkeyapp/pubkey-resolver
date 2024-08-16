import { Group } from '@mantine/core'
import { Account, AccountType } from '@pubkey-resolver/sdk'
import { useAdminFindOneAccount, useAdminResolveWallet } from '@pubkey-resolver/web-account-data-access'
import { AccountUiItem } from '@pubkey-resolver/web-account-ui'
import {
  UiBack,
  UiCard,
  UiDebug,
  UiDebugModal,
  UiError,
  UiLoader,
  UiPage,
  UiTabRoute,
  UiTabRoutes,
} from '@pubkey-ui/core'
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

  if (item.type === AccountType.SolanaWallet) {
    tabs.push({
      path: 'resolvers',
      label: 'Resolvers',
      element: <AdminAccountResolveWalletFeature item={item} />,
    })
  }

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
function AdminAccountResolveWalletFeature({ item }: { item: Account }) {
  const { query } = useAdminResolveWallet({ address: item.address, cluster: item.cluster })

  if (query.isLoading) {
    return <UiLoader />
  }
  if (!query.data) {
    return <UiError message={`${query.error?.message.toString()}`} />
  }

  return (
    <UiPage leftAction={<UiBack />} title="Resolvers">
      <UiCard>
        <UiDebug data={query.data} open />
      </UiCard>
    </UiPage>
  )
}
