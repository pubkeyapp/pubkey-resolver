import { Group } from '@mantine/core'
import { NetworkCluster } from '@pubkey-resolver/sdk'
import { UiSearchField } from '@pubkey-resolver/web-core-ui'
import { useUserFindManyIndexEntry } from '@pubkey-resolver/web-index-entry-data-access'
import { IndexEntryUiGrid } from '@pubkey-resolver/web-index-entry-ui'
import { UiDebugModal, UiInfo, UiLoader, UiStack } from '@pubkey-ui/core'

export default function UserIndexEntryListFeature({
  cluster,
  indexAddress,
}: {
  cluster: NetworkCluster
  indexAddress: string
}) {
  const { items, pagination, query, setSearch } = useUserFindManyIndexEntry({
    limit: 12,
    cluster,
    indexAddress,
  })

  return (
    <UiStack>
      <Group>
        <UiSearchField placeholder="Search entry" setSearch={setSearch} />
        <UiDebugModal data={items} />
      </Group>

      {query.isLoading ? (
        <UiLoader />
      ) : items?.length ? (
        <IndexEntryUiGrid
          indexEntries={items}
          page={pagination.page}
          totalRecords={pagination.total}
          onPageChange={pagination.setPage}
          limit={pagination.limit}
          setLimit={pagination.setLimit}
          setPage={pagination.setPage}
        />
      ) : (
        <UiInfo message="No entries found" />
      )}
    </UiStack>
  )
}
