import { Index } from '@pubkey-resolver/sdk'
import { useAdminFindOneIndex, useAdminGetAccountInfo } from '@pubkey-resolver/web-index-data-access'
import { IndexUiInfo } from '@pubkey-resolver/web-index-ui'
import { UiCard, UiDebug, UiError, UiLoader, UiStack } from '@pubkey-ui/core'

export function AdminIndexDetailInfoTab({ indexId }: { indexId: string }) {
  const { item, query } = useAdminFindOneIndex({ indexId })

  if (query.isLoading) {
    return <UiLoader />
  }
  if (!item) {
    return <UiError message="Index not found." />
  }

  return (
    <UiStack>
      <UiCard>
        <IndexUiInfo index={item} />
      </UiCard>
      <AdminIndexGetInfoTab item={item} />
    </UiStack>
  )
}

export function AdminIndexGetInfoTab({ item }: { item: Index }) {
  const { query } = useAdminGetAccountInfo({ address: item.address, cluster: item.cluster })

  if (query.isLoading) {
    return <UiLoader />
  }
  if (!query.data) {
    return <UiError message="Index info not found." />
  }

  return (
    <UiCard>
      <UiDebug data={query.data} open />
    </UiCard>
  )
}
