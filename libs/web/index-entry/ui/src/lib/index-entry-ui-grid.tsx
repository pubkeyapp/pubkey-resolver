import { Group, Pagination, SimpleGrid } from '@mantine/core'
import { IndexEntry } from '@pubkey-resolver/sdk'
import { gridLimits, UiPageLimit } from '@pubkey-resolver/web-core-ui'
import { UiDebugModal, UiGroup, UiStack } from '@pubkey-ui/core'
import { DataTableProps } from 'mantine-datatable'
import { IndexEntryUiGridItem } from './index-entry-ui-grid-item'

export function IndexEntryUiGrid({
  indexEntries = [],
  onPageChange,
  page,
  totalRecords,
  limit,
  setLimit,
  setPage,
}: {
  indexEntries: IndexEntry[]
  page: DataTableProps['page']
  totalRecords: number
  onPageChange: (page: number) => void
  limit: number
  setLimit: (limit: number) => void
  setPage: (page: number) => void
}) {
  const totalPages = totalRecords / limit + 1
  return (
    <UiStack>
      <SimpleGrid cols={{ base: 1, sm: 2, md: 3 }} spacing="md">
        {indexEntries.map((indexEntry) => (
          <IndexEntryUiGridItem key={indexEntry.id} to={indexEntry.id} indexEntry={indexEntry} />
        ))}
      </SimpleGrid>
      <UiGroup>
        <Pagination disabled={totalPages < 2} total={totalPages} value={page} onChange={onPageChange} />
        <Group>
          <UiDebugModal data={indexEntries} />
          <UiPageLimit data={gridLimits} limit={limit} setLimit={setLimit} setPage={setPage} />
        </Group>
      </UiGroup>
    </UiStack>
  )
}
