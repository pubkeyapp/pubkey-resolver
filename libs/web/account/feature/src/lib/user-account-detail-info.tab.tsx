import { useUserFindOneAccount } from '@pubkey-resolver/web-account-data-access'
import { AccountUiInfo } from '@pubkey-resolver/web-account-ui'
import { UiCard, UiError, UiLoader } from '@pubkey-ui/core'

export function UserAccountDetailInfoTab({ accountId }: { accountId: string }) {
  const { item, query } = useUserFindOneAccount({ accountId })

  if (query.isLoading) {
    return <UiLoader />
  }
  if (!item) {
    return <UiError message="Account not found." />
  }

  return (
    <UiCard>
      <AccountUiInfo account={item} />
    </UiCard>
  )
}
