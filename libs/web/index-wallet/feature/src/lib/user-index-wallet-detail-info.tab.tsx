import { useUserFindOneIndexWallet } from '@pubkey-resolver/web-index-wallet-data-access'
import { IndexWalletUiInfo } from '@pubkey-resolver/web-index-wallet-ui'
import { UiCard, UiError, UiLoader } from '@pubkey-ui/core'

export function UserIndexWalletDetailInfoTab({ indexWalletId }: { indexWalletId: string }) {
  const { item, query } = useUserFindOneIndexWallet({ indexWalletId })

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
