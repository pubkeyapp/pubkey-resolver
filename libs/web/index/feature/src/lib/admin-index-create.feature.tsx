import { IndexAdminCreateInput } from '@pubkey-resolver/sdk'
import { useAdminFindManyIndex } from '@pubkey-resolver/web-index-data-access'
import { AdminIndexUiCreateForm } from '@pubkey-resolver/web-index-ui'
import { toastError, UiBack, UiCard, UiPage } from '@pubkey-ui/core'
import { useNavigate } from 'react-router-dom'

export default function AdminIndexCreateFeature() {
  const navigate = useNavigate()
  const { createIndex } = useAdminFindManyIndex()

  async function submit(input: IndexAdminCreateInput) {
    return createIndex(input)
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
    <UiPage leftAction={<UiBack />} title="Create Index">
      <UiCard>
        <AdminIndexUiCreateForm submit={submit} />
      </UiCard>
    </UiPage>
  )
}
