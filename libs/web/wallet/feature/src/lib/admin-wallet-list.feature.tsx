import { Button, Group } from '@mantine/core'
import { UiPageLimit, UiSearchField } from '@pubkey-resolver/web-core-ui'
import { useAdminFindManyWallet } from '@pubkey-resolver/web-wallet-data-access'
import { AdminWalletUiTable } from '@pubkey-resolver/web-wallet-ui'
import { UiBack, UiDebugModal, UiInfo, UiLoader, UiPage } from '@pubkey-ui/core'
import { Link } from 'react-router-dom'

export default function AdminWalletListFeature() {
  const { deleteWallet, items, pagination, query, setSearch } = useAdminFindManyWallet({
    limit: 10,
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
        <UiPageLimit limit={pagination.limit} setLimit={pagination.setLimit} setPage={pagination.setPage} />
      </Group>

      {query.isLoading ? (
        <UiLoader />
      ) : items?.length ? (
        <AdminWalletUiTable
          deleteWallet={(wallet) => {
            if (!window.confirm('Are you sure?')) return
            return deleteWallet(wallet.id)
          }}
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
