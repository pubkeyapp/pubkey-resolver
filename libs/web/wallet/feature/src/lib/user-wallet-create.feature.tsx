import { WalletUserCreateInput } from '@pubkey-resolver/sdk'
import { useUserFindManyWallet } from '@pubkey-resolver/web-wallet-data-access'
import { UserWalletUiCreateForm } from '@pubkey-resolver/web-wallet-ui'
import { toastError, UiBack, UiCard, UiPage } from '@pubkey-ui/core'
import { useNavigate } from 'react-router-dom'

export default function UserWalletCreateFeature() {
  const navigate = useNavigate()
  const { createWallet } = useUserFindManyWallet()

  async function submit(input: WalletUserCreateInput) {
    return createWallet(input)
      .then((res) => {
        if (res) {
          navigate(`../${res?.id}`)
        }
      })
      .then(() => true)
      .catch((err) => {
        toastError(err.message)
        return false
      })
  }

  return (
    <UiPage leftAction={<UiBack />} title="Create Wallet">
      <UiCard>
        <UserWalletUiCreateForm submit={submit} />
      </UiCard>
    </UiPage>
  )
}
