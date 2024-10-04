import { Group } from '@mantine/core'
import { UiSearchField } from '@pubkey-resolver/web-core-ui'
import { useUserFindManyIndexWallet } from '@pubkey-resolver/web-index-wallet-data-access'
import { IndexWalletUiGrid } from '@pubkey-resolver/web-index-wallet-ui'
import { UiDebugModal, UiInfo, UiLoader, UiStack } from '@pubkey-ui/core'

export default function UserIndexWalletListFeature({ walletId }: { walletId: string }) {
  const { items, pagination, query, setSearch } = useUserFindManyIndexWallet({
    limit: 12,
    walletId,
  })

  return (
    <UiStack>
      <Group>
        <UiSearchField placeholder="Search index" setSearch={setSearch} />
        <UiDebugModal data={items} />
      </Group>

      {query.isLoading ? (
        <UiLoader />
      ) : items?.length ? (
        <IndexWalletUiGrid
          indexWallets={items}
          page={pagination.page}
          totalRecords={pagination.total}
          onPageChange={pagination.setPage}
          limit={pagination.limit}
          setLimit={pagination.setLimit}
          setPage={pagination.setPage}
        />
      ) : (
        <UiInfo message="No indexWallets found" />
      )}
    </UiStack>
  )
}
