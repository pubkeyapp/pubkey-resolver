import { Group } from '@mantine/core'
import { AccountType, NetworkCluster } from '@pubkey-resolver/sdk'
import { useUserFindManyAccount } from '@pubkey-resolver/web-account-data-access'
import { UserAccountUiTable } from '@pubkey-resolver/web-account-ui'
import { UiSearchField } from '@pubkey-resolver/web-core-ui'
import { getEnumOptions, UiBack, UiDebugModal, UiInfo, UiLoader, UiPage, UiSelectEnum } from '@pubkey-ui/core'

export default function UserAccountListFeature() {
  const { cluster, setCluster, type, setType, items, pagination, query, setSearch } = useUserFindManyAccount({
    limit: 12,
  })

  return (
    <UiPage
      title="Accounts"
      leftAction={<UiBack />}
      rightAction={
        <Group>
          <UiDebugModal data={items} />
        </Group>
      }
    >
      <Group>
        <UiSearchField placeholder="Search account" setSearch={setSearch} />
        <UiSelectEnum<NetworkCluster>
          value={cluster}
          setValue={setCluster}
          placeholder="Filter by cluster"
          clearable
          options={getEnumOptions(NetworkCluster)}
        />
        <UiSelectEnum<AccountType>
          value={type}
          setValue={setType}
          placeholder="Filter by type"
          clearable
          options={getEnumOptions(AccountType)}
        />
      </Group>

      {query.isLoading ? (
        <UiLoader />
      ) : items?.length ? (
        <UserAccountUiTable
          accounts={items}
          page={pagination.page}
          totalRecords={pagination.total}
          recordsPerPage={pagination.limit}
          onPageChange={(page) => void pagination.setPage(page)}
        />
      ) : (
        <UiInfo message="No accounts found" />
      )}
    </UiPage>
  )
}
