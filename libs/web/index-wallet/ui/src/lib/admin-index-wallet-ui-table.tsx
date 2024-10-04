import { ActionIcon, Group, ScrollArea } from '@mantine/core'
import { IndexWallet } from '@pubkey-resolver/sdk'
import { IndexUiItem } from '@pubkey-resolver/web-index-ui'
import { IconPencil, IconTrash } from '@tabler/icons-react'
import { DataTable, DataTableProps } from 'mantine-datatable'
import { Link } from 'react-router-dom'

export function AdminIndexWalletUiTable({
  deleteIndexWallet,
  indexWallets = [],
  onPageChange,
  page,
  recordsPerPage,
  totalRecords,
}: {
  deleteIndexWallet: (indexWallet: IndexWallet) => void
  indexWallets: IndexWallet[]
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
            accessor: 'name',
            render: (item) => (item.index ? <IndexUiItem index={item.index} to={`./${item.id}`} /> : null),
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
                <ActionIcon color="red" variant="light" size="sm" onClick={() => deleteIndexWallet(item)}>
                  <IconTrash size={16} />
                </ActionIcon>
              </Group>
            ),
          },
        ]}
        records={indexWallets}
      />
    </ScrollArea>
  )
}
