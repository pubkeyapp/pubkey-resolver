import { Button, Group } from '@mantine/core'
import { IndexType, NetworkCluster } from '@pubkey-resolver/sdk'
import { UiPageLimit, UiSearchField } from '@pubkey-resolver/web-core-ui'
import { useAdminFindManyIndex } from '@pubkey-resolver/web-index-data-access'
import { AdminIndexUiTable } from '@pubkey-resolver/web-index-ui'
import { getEnumOptions, UiBack, UiDebugModal, UiInfo, UiLoader, UiPage, UiSelectEnum } from '@pubkey-ui/core'
import { Link } from 'react-router-dom'

export default function AdminIndexListFeature() {
  const { deleteIndex, cluster, setCluster, type, setType, items, pagination, query, setSearch } =
    useAdminFindManyIndex({
      limit: 100,
    })

  return (
    <UiPage
      title="Indexes"
      leftAction={<UiBack />}
      rightAction={
        <Group>
          <UiDebugModal data={items} />
          <Button component={Link} to="resolve">
            Resolve
          </Button>
          <Button component={Link} to="create">
            Create
          </Button>
        </Group>
      }
    >
      <Group>
        <UiSearchField placeholder="Search index" setSearch={setSearch} />
        <UiPageLimit limit={pagination.limit} setLimit={pagination.setLimit} setPage={pagination.setPage} />
        <UiSelectEnum<NetworkCluster>
          value={cluster}
          setValue={setCluster}
          placeholder="Filter by cluster"
          clearable
          options={getEnumOptions(NetworkCluster)}
        />
        <UiSelectEnum<IndexType>
          value={type}
          setValue={setType}
          placeholder="Filter by type"
          clearable
          options={getEnumOptions(IndexType)}
        />
      </Group>

      {query.isLoading ? (
        <UiLoader />
      ) : items?.length ? (
        <AdminIndexUiTable
          deleteIndex={(index) => {
            if (!window.confirm('Are you sure?')) return
            return deleteIndex(index.id)
          }}
          indexes={items}
          page={pagination.page}
          totalRecords={pagination.total}
          recordsPerPage={pagination.limit}
          onPageChange={(page) => void pagination.setPage(page)}
        />
      ) : (
        <UiInfo message="No indexes found" />
      )}
    </UiPage>
  )
}
