import { AccountAdminResolveInput } from '@pubkey-resolver/sdk'
import { useAdminFindManyAccount } from '@pubkey-resolver/web-account-data-access'
import { AdminAccountUiResolveForm } from '@pubkey-resolver/web-account-ui'
import { toastError, UiBack, UiCard, UiPage } from '@pubkey-ui/core'
import { useState } from 'react'

export default function AdminAccountResolveFeature() {
  const { resolveAccount } = useAdminFindManyAccount()
  const [account, setAccount] = useState<unknown | undefined>(undefined)

  async function submit(input: AccountAdminResolveInput) {
    setAccount(undefined)
    return resolveAccount(input)
      .then((res) => {
        setAccount(res)
      })
      .then(() => true)
      .catch((err) => {
        toastError(err.message)
        return false
      })
  }

  return (
    <UiPage leftAction={<UiBack />} title="Resolve Account">
      <UiCard>
        <AdminAccountUiResolveForm submit={submit} />
      </UiCard>
      {account ? <UiCard title="Resolved Account">{JSON.stringify(account)}</UiCard> : null}
    </UiPage>
  )
}
