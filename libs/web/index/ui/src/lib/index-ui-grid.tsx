import { Group, Pagination, SimpleGrid } from '@mantine/core'
import { Index } from '@pubkey-resolver/sdk'
import { gridLimits, UiPageLimit } from '@pubkey-resolver/web-core-ui'
import { UiDebugModal, UiGroup, UiStack } from '@pubkey-ui/core'
import { DataTableProps } from 'mantine-datatable'
import { IndexUiGridItem } from './index-ui-grid-item'

export function IndexUiGrid({
  indexes = [],
  onPageChange,
  page,
  totalRecords,
  limit,
  setLimit,
  setPage,
}: {
  indexes: Index[]
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
        {indexes.map((index) => (
          <IndexUiGridItem key={index.id} to={index.id} index={index} />
        ))}
      </SimpleGrid>
      <UiGroup>
        <Pagination disabled={totalPages < 2} total={totalPages} value={page} onChange={onPageChange} />
        <Group>
          <UiDebugModal data={indexes} />
          <UiPageLimit data={gridLimits} limit={limit} setLimit={setLimit} setPage={setPage} />
        </Group>
      </UiGroup>
    </UiStack>
  )
}
