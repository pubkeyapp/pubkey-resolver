import { Group } from '@mantine/core'
import { useAdminFindOneIndexEntry } from '@pubkey-resolver/web-index-entry-data-access'
import { IndexEntryUiInfo, IndexEntryUiItem } from '@pubkey-resolver/web-index-entry-ui'
import { UiBack, UiDebugModal, UiError, UiLoader, UiPage } from '@pubkey-ui/core'
import { useParams } from 'react-router-dom'

export default function AdminIndexEntryDetailFeature() {
  const { indexEntryId } = useParams<{ indexEntryId: string }>() as { indexEntryId: string }
  const { item, query } = useAdminFindOneIndexEntry({ indexEntryId })

  if (query.isLoading) {
    return <UiLoader />
  }
  if (!item) {
    return <UiError message="IndexEntry not found." />
  }

  return (
    <UiPage
      title={<IndexEntryUiItem indexEntry={item} />}
      leftAction={<UiBack />}
      rightAction={
        <Group>
          <UiDebugModal data={item} />
        </Group>
      }
    >
      <IndexEntryUiInfo indexEntry={item} />
    </UiPage>
  )
}
