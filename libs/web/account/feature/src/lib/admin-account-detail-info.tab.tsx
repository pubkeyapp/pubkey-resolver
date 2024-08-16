import { Account } from '@pubkey-resolver/sdk'
import { useAdminFindOneAccount, useAdminGetAccountInfo } from '@pubkey-resolver/web-account-data-access'
import { AccountUiInfo } from '@pubkey-resolver/web-account-ui'
import { UiCard, UiDebug, UiError, UiLoader, UiStack } from '@pubkey-ui/core'

export function AdminAccountDetailInfoTab({ accountId }: { accountId: string }) {
  const { item, query } = useAdminFindOneAccount({ accountId })

  if (query.isLoading) {
    return <UiLoader />
  }
  if (!item) {
    return <UiError message="Account not found." />
  }

  return (
    <UiStack>
      <UiCard>
        <AccountUiInfo account={item} />
      </UiCard>
      <AdminAccountGetInfoTab item={item} />
    </UiStack>
  )
}

export function AdminAccountGetInfoTab({ item }: { item: Account }) {
  const { query } = useAdminGetAccountInfo({ address: item.address, cluster: item.cluster })

  if (query.isLoading) {
    return <UiLoader />
  }
  if (!query.data) {
    return <UiError message="Account info not found." />
  }

  return (
    <UiCard>
      <UiDebug data={query.data} open />
    </UiCard>
  )
}
