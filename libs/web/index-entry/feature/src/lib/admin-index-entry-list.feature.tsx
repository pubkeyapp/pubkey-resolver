import { Group } from '@mantine/core'
import { NetworkCluster } from '@pubkey-resolver/sdk'
import { UiPageLimit, UiSearchField } from '@pubkey-resolver/web-core-ui'
import { useAdminFindManyIndexEntry } from '@pubkey-resolver/web-index-entry-data-access'
import { AdminIndexEntryUiTable } from '@pubkey-resolver/web-index-entry-ui'
import { UiDebugModal, UiInfo, UiLoader, UiStack } from '@pubkey-ui/core'

export default function AdminIndexEntryListFeature({
  cluster,
  indexAddress,
}: {
  cluster: NetworkCluster
  indexAddress: string
}) {
  const { deleteIndexEntry, items, pagination, query, setSearch } = useAdminFindManyIndexEntry({
    limit: 10,
    cluster,
    indexAddress,
  })

  return (
    <UiStack>
      <Group>
        <UiSearchField placeholder="Search entry" setSearch={setSearch} />
        <UiPageLimit limit={pagination.limit} setLimit={pagination.setLimit} setPage={pagination.setPage} />
        <UiDebugModal data={items} />
      </Group>

      {query.isLoading ? (
        <UiLoader />
      ) : items?.length ? (
        <AdminIndexEntryUiTable
          deleteIndexEntry={(indexEntry) => {
            if (!window.confirm('Are you sure?')) return
            return deleteIndexEntry(indexEntry.id)
          }}
          indexEntries={items}
          page={pagination.page}
          totalRecords={pagination.total}
          recordsPerPage={pagination.limit}
          onPageChange={(page) => void pagination.setPage(page)}
        />
      ) : (
        <UiInfo message="No entries found" />
      )}
    </UiStack>
  )
}
