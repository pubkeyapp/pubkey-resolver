import { IndexAdminResolveInput } from '@pubkey-resolver/sdk'
import { useAdminFindManyIndex } from '@pubkey-resolver/web-index-data-access'
import { AdminIndexUiResolveForm } from '@pubkey-resolver/web-index-ui'
import { toastError, UiBack, UiCard, UiPage } from '@pubkey-ui/core'
import { useState } from 'react'

export default function AdminIndexResolveFeature() {
  const { resolveIndex } = useAdminFindManyIndex()
  const [index, setIndex] = useState<unknown | undefined>(undefined)

  async function submit(input: IndexAdminResolveInput) {
    setIndex(undefined)
    return resolveIndex(input)
      .then((res) => {
        setIndex(res)
      })
      .then(() => true)
      .catch((err) => {
        toastError(err.message)
        return false
      })
  }

  return (
    <UiPage leftAction={<UiBack />} title="Resolve Index">
      <UiCard>
        <AdminIndexUiResolveForm submit={submit} />
      </UiCard>
      {index ? <UiCard title="Resolved Index">{JSON.stringify(index)}</UiCard> : null}
    </UiPage>
  )
}
