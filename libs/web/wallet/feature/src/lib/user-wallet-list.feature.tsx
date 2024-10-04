import { Button, Group } from '@mantine/core'
import { UiSearchField } from '@pubkey-resolver/web-core-ui'
import { useUserFindManyWallet } from '@pubkey-resolver/web-wallet-data-access'
import { UserWalletUiTable } from '@pubkey-resolver/web-wallet-ui'
import { UiBack, UiDebugModal, UiInfo, UiLoader, UiPage } from '@pubkey-ui/core'
import { Link } from 'react-router-dom'

export default function UserWalletListFeature() {
  const { items, pagination, query, setSearch } = useUserFindManyWallet({
    limit: 12,
  })

  return (
    <UiPage
      title="Wallets"
      leftAction={<UiBack />}
      rightAction={
        <Group>
          <UiDebugModal data={items} />
          <Button component={Link} to="create">
            Create
          </Button>
        </Group>
      }
    >
      <Group>
        <UiSearchField placeholder="Search wallet" setSearch={setSearch} />
      </Group>

      {query.isLoading ? (
        <UiLoader />
      ) : items?.length ? (
        <UserWalletUiTable
          wallets={items}
          page={pagination.page}
          totalRecords={pagination.total}
          recordsPerPage={pagination.limit}
          onPageChange={(page) => void pagination.setPage(page)}
        />
      ) : (
        <UiInfo message="No wallets found" />
      )}
    </UiPage>
  )
}
