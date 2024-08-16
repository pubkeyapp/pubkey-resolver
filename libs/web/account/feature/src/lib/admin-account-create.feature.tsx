import { AccountAdminCreateInput } from '@pubkey-resolver/sdk'
import { useAdminFindManyAccount } from '@pubkey-resolver/web-account-data-access'
import { AdminAccountUiCreateForm } from '@pubkey-resolver/web-account-ui'
import { toastError, UiBack, UiCard, UiPage } from '@pubkey-ui/core'
import { useNavigate } from 'react-router-dom'

export default function AdminAccountCreateFeature() {
  const navigate = useNavigate()
  const { createAccount } = useAdminFindManyAccount()

  async function submit(input: AccountAdminCreateInput) {
    return createAccount(input)
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
    <UiPage leftAction={<UiBack />} title="Create Account">
      <UiCard>
        <AdminAccountUiCreateForm submit={submit} />
      </UiCard>
    </UiPage>
  )
}
