import { Group } from '@mantine/core'
import { useAdminFindOneIndex } from '@pubkey-resolver/web-index-data-access'
import { AdminIndexEntryFeature } from '@pubkey-resolver/web-index-entry-feature'
import { IndexUiItem } from '@pubkey-resolver/web-index-ui'
import { UiBack, UiDebugModal, UiError, UiLoader, UiPage, UiTabRoute, UiTabRoutes } from '@pubkey-ui/core'
import { useParams } from 'react-router-dom'
import { AdminIndexDetailInfoTab } from './admin-index-detail-info.tab'
import { AdminIndexDetailSettingsTab } from './admin-index-detail-settings.tab'
import { AdminIndexResolveWalletFeature } from './admin-index-resolve-wallet-feature'

export default function AdminIndexDetailFeature() {
  const { indexId } = useParams<{ indexId: string }>() as { indexId: string }
  const { item, query } = useAdminFindOneIndex({ indexId })

  if (query.isLoading) {
    return <UiLoader />
  }
  if (!item) {
    return <UiError message="Index not found." />
  }

  const tabs: UiTabRoute[] = [
    {
      path: 'info',
      label: 'Info',
      element: <AdminIndexDetailInfoTab indexId={indexId} />,
    },
    {
      path: 'settings',
      label: 'Settings',
      element: <AdminIndexDetailSettingsTab indexId={indexId} />,
    },
    {
      path: 'resolve',
      label: 'Resolve',
      element: <AdminIndexResolveWalletFeature item={item} />,
    },
    {
      path: 'entries',
      label: 'Entries',
      element: <AdminIndexEntryFeature cluster={item.cluster} indexAddress={item.address} />,
    },
  ]

  return (
    <UiPage
      title={<IndexUiItem index={item} />}
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
