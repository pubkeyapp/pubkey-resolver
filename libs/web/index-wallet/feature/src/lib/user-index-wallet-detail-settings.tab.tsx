import { useUserFindOneIndexWallet } from '@pubkey-resolver/web-index-wallet-data-access'
import { UserIndexWalletUiUpdateForm } from '@pubkey-resolver/web-index-wallet-ui'
import { UiCard, UiError, UiLoader } from '@pubkey-ui/core'

export function UserIndexWalletDetailSettingsTab({ indexWalletId }: { indexWalletId: string }) {
  const { item, query, updateIndexWallet } = useUserFindOneIndexWallet({ indexWalletId })

  if (query.isLoading) {
    return <UiLoader />
  }
  if (!item) {
    return <UiError message="IndexWallet not found." />
  }

  return (
    <UiCard>
      <UserIndexWalletUiUpdateForm indexWallet={item} submit={updateIndexWallet} />
    </UiCard>
  )
}
