import { Group } from '@mantine/core'
import { UiPageLimit, UiSearchField } from '@pubkey-resolver/web-core-ui'
import { useAdminFindManyIndex } from '@pubkey-resolver/web-index-data-access'
import { useAdminFindManyIndexWallet } from '@pubkey-resolver/web-index-wallet-data-access'
import { AdminIndexWalletUiTable } from '@pubkey-resolver/web-index-wallet-ui'
import { UiDebugModal, UiInfo, UiLoader, UiStack } from '@pubkey-ui/core'
import { IndexWalletButton } from './index-wallet-button'

export default function AdminIndexWalletListFeature({ walletId }: { walletId: string }) {
  const { items: indexes } = useAdminFindManyIndex({
    limit: 1000,
  })
  const { deleteIndexWallet, items, pagination, query, setSearch } = useAdminFindManyIndexWallet({
    limit: 10,
    walletId,
  })

  const missingIndexes = indexes.filter((index) => !items.find((item) => item.indexId === index.id))

  return (
    <UiStack>
      <Group>
        <UiSearchField placeholder="Search index" setSearch={setSearch} />
        <UiPageLimit limit={pagination.limit} setLimit={pagination.setLimit} setPage={pagination.setPage} />
        <UiDebugModal data={items} />
        <UiDebugModal data={missingIndexes} />
      </Group>

      {query.isLoading ? (
        <UiLoader />
      ) : (
        <UiStack>
          {items?.length ? (
            <UiStack>
              <AdminIndexWalletUiTable
                deleteIndexWallet={(indexWallet) => {
                  if (!window.confirm('Are you sure?')) return
                  return deleteIndexWallet(indexWallet.id)
                }}
                indexWallets={items}
                page={pagination.page}
                totalRecords={pagination.total}
                recordsPerPage={pagination.limit}
                onPageChange={(page) => void pagination.setPage(page)}
              />
            </UiStack>
          ) : (
            <UiInfo message="No indexes found" />
          )}
          {missingIndexes.length ? (
            <Group>
              {missingIndexes.map((index) => (
                <IndexWalletButton refresh={() => query.refetch()} key={index.id} index={index} walletId={walletId} />
              ))}
            </Group>
          ) : null}
        </UiStack>
      )}
    </UiStack>
  )
}
