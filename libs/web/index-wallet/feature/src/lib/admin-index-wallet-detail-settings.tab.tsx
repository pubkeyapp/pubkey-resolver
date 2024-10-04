import { useAdminFindOneIndexWallet } from '@pubkey-resolver/web-index-wallet-data-access'
import { AdminIndexWalletUiUpdateForm } from '@pubkey-resolver/web-index-wallet-ui'
import { UiCard, UiError, UiLoader } from '@pubkey-ui/core'

export function AdminIndexWalletDetailSettingsTab({ indexWalletId }: { indexWalletId: string }) {
  const { item, query, updateIndexWallet } = useAdminFindOneIndexWallet({ indexWalletId })

  if (query.isLoading) {
    return <UiLoader />
  }
  if (!item) {
    return <UiError message="IndexWallet not found." />
  }

  return (
    <UiCard>
      <AdminIndexWalletUiUpdateForm indexWallet={item} submit={updateIndexWallet} />
    </UiCard>
  )
}
