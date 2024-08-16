import { Group } from '@mantine/core'
import { useUserFindOneIndex } from '@pubkey-resolver/web-index-data-access'
import { UserIndexEntryFeature } from '@pubkey-resolver/web-index-entry-feature'
import { IndexUiItem } from '@pubkey-resolver/web-index-ui'
import { UiBack, UiDebugModal, UiError, UiLoader, UiPage, UiTabRoute, UiTabRoutes } from '@pubkey-ui/core'
import { useParams } from 'react-router-dom'
import { UserIndexDetailInfoTab } from './user-index-detail-info.tab'

export default function UserIndexDetailFeature() {
  const { indexId } = useParams<{ indexId: string }>() as { indexId: string }
  const { item, query } = useUserFindOneIndex({ indexId })

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
      element: <UserIndexDetailInfoTab indexId={indexId} />,
    },
    {
      path: 'entries',
      label: 'Entries',
      element: <UserIndexEntryFeature cluster={item.cluster} indexAddress={item.address} />,
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
