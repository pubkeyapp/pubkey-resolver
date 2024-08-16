import { Button, Group } from '@mantine/core'
import { AccountAdminCreateInput, AccountType, NetworkCluster } from '@pubkey-resolver/sdk'
import { useAdminFindManyAccount } from '@pubkey-resolver/web-account-data-access'
import { AdminAccountUiTable } from '@pubkey-resolver/web-account-ui'
import { UiPageLimit, UiSearchField } from '@pubkey-resolver/web-core-ui'
import { getEnumOptions, UiBack, UiCard, UiDebugModal, UiInfo, UiLoader, UiPage, UiSelectEnum } from '@pubkey-ui/core'
import { Link } from 'react-router-dom'

const exampleAccounts: AccountAdminCreateInput[] = [
  {
    type: AccountType.SolanaNonFungible,
    address: 'SMBtHCCC6RYRutFEPb4gZqeBLUZbMNhRKaMKZZLHi7W',
    cluster: NetworkCluster.SolanaMainnet,
    label: 'SMB Gen 2',
  },
  {
    type: AccountType.SolanaNonFungible,
    address: 'HS1oygRKNBG1nMqjSmaBXSQqQ7apWr14gUU4pW3aDMCP',
    cluster: NetworkCluster.SolanaMainnet,
    label: 'SILICONS',
  },
  {
    type: AccountType.SolanaFungible,
    address: 'DezXAZ8z7PnrnRJjz3wXBoRgixCa6xjnB7YaB1pPB263',
    cluster: NetworkCluster.SolanaMainnet,
    label: 'BONK',
  },
  {
    type: AccountType.SolanaFungible,
    address: 'EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v',
    cluster: NetworkCluster.SolanaMainnet,
    label: 'USDC',
  },
  {
    type: AccountType.SolanaFungible,
    address: '2kMpEJCZL8vEDZe7YPLMCS9Y3WKSAMedXBn7xHPvsWvi',
    cluster: NetworkCluster.SolanaMainnet,
    label: 'MOON',
  },
  {
    type: AccountType.SolanaGenesis,
    address: '5eykt4UsFv8P8NJdTREpY1vzqKqZKvdpKuc147dw2N9d',
    cluster: NetworkCluster.SolanaMainnet,
    label: 'Genesis Hash',
  },
]

export default function AdminAccountListFeature() {
  const { createAccount, deleteAccount, cluster, setCluster, type, setType, items, pagination, query, setSearch } =
    useAdminFindManyAccount({
      limit: 100,
    })

  return (
    <UiPage
      title="Accounts"
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
        <UiSearchField placeholder="Search account" setSearch={setSearch} />
        <UiPageLimit limit={pagination.limit} setLimit={pagination.setLimit} setPage={pagination.setPage} />
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
        <AdminAccountUiTable
          deleteAccount={(account) => {
            if (!window.confirm('Are you sure?')) return
            return deleteAccount(account.id)
          }}
          accounts={items}
          page={pagination.page}
          totalRecords={pagination.total}
          recordsPerPage={pagination.limit}
          onPageChange={(page) => void pagination.setPage(page)}
        />
      ) : (
        <UiInfo message="No accounts found" />
      )}
      <UiCard title="Example Accounts">
        <Group>
          {exampleAccounts.map((account) => (
            <Button
              disabled={items.some((item) => item.address === account.address)}
              key={account.address}
              onClick={() => createAccount(account)}
            >
              {account.label}
            </Button>
          ))}
        </Group>
      </UiCard>
    </UiPage>
  )
}
