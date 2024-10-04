import { useAdminFindOneIndexWallet } from '@pubkey-resolver/web-index-wallet-data-access'
import { IndexWalletUiInfo } from '@pubkey-resolver/web-index-wallet-ui'
import { UiCard, UiError, UiLoader } from '@pubkey-ui/core'

export function AdminIndexWalletDetailInfoTab({ indexWalletId }: { indexWalletId: string }) {
  const { item, query } = useAdminFindOneIndexWallet({ indexWalletId })

  if (query.isLoading) {
    return <UiLoader />
  }
  if (!item) {
    return <UiError message="IndexWallet not found." />
  }

  return (
    <UiCard>
      <IndexWalletUiInfo indexWallet={item} />
    </UiCard>
  )
}
