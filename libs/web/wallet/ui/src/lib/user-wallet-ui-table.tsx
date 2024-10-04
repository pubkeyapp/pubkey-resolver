import { ActionIcon, Group, ScrollArea } from '@mantine/core'
import { Wallet } from '@pubkey-resolver/sdk'
import { IconPencil, IconTrash } from '@tabler/icons-react'
import { DataTable, DataTableProps } from 'mantine-datatable'
import { Link } from 'react-router-dom'
import { WalletUiItem } from './wallet-ui-item'

export function UserWalletUiTable({
  wallets = [],
  onPageChange,
  page,
  recordsPerPage,
  totalRecords,
}: {
  wallets: Wallet[]
  page: DataTableProps['page']
  totalRecords: DataTableProps['totalRecords']
  recordsPerPage: DataTableProps['recordsPerPage']
  onPageChange: (page: number) => void
}) {
  return (
    <ScrollArea>
      <DataTable
        borderRadius="sm"
        withTableBorder
        shadow="xs"
        onPageChange={onPageChange}
        page={page ?? 1}
        recordsPerPage={recordsPerPage ?? 10}
        totalRecords={totalRecords ?? 1}
        columns={[
          {
            accessor: 'label',
            render: (item) => <WalletUiItem to={`./${item.id}`} wallet={item} />,
          },
          {
            accessor: 'actions',
            title: 'Actions',
            textAlign: 'right',
            render: (item) => (
              <Group gap="xs" justify="right">
                <ActionIcon color="brand" variant="light" size="sm" component={Link} to={`./${item.id}/settings`}>
                  <IconPencil size={16} />
                </ActionIcon>
              </Group>
            ),
          },
        ]}
        records={wallets}
      />
    </ScrollArea>
  )
}
