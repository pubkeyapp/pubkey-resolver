import { Group, Pagination, SimpleGrid } from '@mantine/core'
import { IndexWallet } from '@pubkey-resolver/sdk'
import { gridLimits, UiPageLimit } from '@pubkey-resolver/web-core-ui'
import { UiDebugModal, UiGroup, UiStack } from '@pubkey-ui/core'
import { DataTableProps } from 'mantine-datatable'
import { IndexWalletUiGridItem } from './index-wallet-ui-grid-item'

export function IndexWalletUiGrid({
  indexWallets = [],
  onPageChange,
  page,
  totalRecords,
  limit,
  setLimit,
  setPage,
}: {
  indexWallets: IndexWallet[]
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
        {indexWallets.map((indexWallet) => (
          <IndexWalletUiGridItem key={indexWallet.id} to={indexWallet.id} indexWallet={indexWallet} />
        ))}
      </SimpleGrid>
      <UiGroup>
        <Pagination disabled={totalPages < 2} total={totalPages} value={page} onChange={onPageChange} />
        <Group>
          <UiDebugModal data={indexWallets} />
          <UiPageLimit data={gridLimits} limit={limit} setLimit={setLimit} setPage={setPage} />
        </Group>
      </UiGroup>
    </UiStack>
  )
}
