import { Group } from '@mantine/core'
import { IndexType, NetworkCluster } from '@pubkey-resolver/sdk'
import { UiSearchField } from '@pubkey-resolver/web-core-ui'
import { useUserFindManyIndex } from '@pubkey-resolver/web-index-data-access'
import { UserIndexUiTable } from '@pubkey-resolver/web-index-ui'
import { getEnumOptions, UiBack, UiDebugModal, UiInfo, UiLoader, UiPage, UiSelectEnum } from '@pubkey-ui/core'

export default function UserIndexListFeature() {
  const { cluster, setCluster, type, setType, items, pagination, query, setSearch } = useUserFindManyIndex({
    limit: 12,
  })

  return (
    <UiPage
      title="Indexes"
      leftAction={<UiBack />}
      rightAction={
        <Group>
          <UiDebugModal data={items} />
        </Group>
      }
    >
      <Group>
        <UiSearchField placeholder="Search index" setSearch={setSearch} />
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
        <UserIndexUiTable
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
