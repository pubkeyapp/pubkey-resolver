import { ActionIcon, Anchor, Group, ScrollArea } from '@mantine/core'
import { Index } from '@pubkey-resolver/sdk'
import { IconPencil, IconTrash } from '@tabler/icons-react'
import { DataTable, DataTableProps } from 'mantine-datatable'
import { Link } from 'react-router-dom'

export function AdminIndexUiTable({
  deleteIndex,
  indexes = [],
  onPageChange,
  page,
  recordsPerPage,
  totalRecords,
}: {
  deleteIndex: (index: Index) => void
  indexes: Index[]
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
            accessor: 'address',
            render: (item) => (
              <Anchor component={Link} to={`./${item.id}`} size="sm" fw={500}>
                {item.label}
              </Anchor>
            ),
          },
          { accessor: 'address' },
          { accessor: 'cluster' },
          { accessor: 'type' },
          {
            accessor: 'actions',
            title: 'Actions',
            textAlign: 'right',
            render: (item) => (
              <Group gap="xs" justify="right">
                <ActionIcon color="brand" variant="light" size="sm" component={Link} to={`./${item.id}/settings`}>
                  <IconPencil size={16} />
                </ActionIcon>
                <ActionIcon color="red" variant="light" size="sm" onClick={() => deleteIndex(item)}>
                  <IconTrash size={16} />
                </ActionIcon>
              </Group>
            ),
          },
        ]}
        records={indexes}
      />
    </ScrollArea>
  )
}
