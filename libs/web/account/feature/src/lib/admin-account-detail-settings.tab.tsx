import { useAdminFindOneAccount } from '@pubkey-resolver/web-account-data-access'
import { AdminAccountUiUpdateForm } from '@pubkey-resolver/web-account-ui'
import { UiCard, UiError, UiLoader } from '@pubkey-ui/core'

export function AdminAccountDetailSettingsTab({ accountId }: { accountId: string }) {
  const { item, query, updateAccount } = useAdminFindOneAccount({ accountId })

  if (query.isLoading) {
    return <UiLoader />
  }
  if (!item) {
    return <UiError message="Account not found." />
  }

  return (
    <UiCard>
      <AdminAccountUiUpdateForm account={item} submit={updateAccount} />
    </UiCard>
  )
}
