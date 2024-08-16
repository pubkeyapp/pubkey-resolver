import { useAdminFindOneIndex } from '@pubkey-resolver/web-index-data-access'
import { AdminIndexUiUpdateForm } from '@pubkey-resolver/web-index-ui'
import { UiCard, UiError, UiLoader } from '@pubkey-ui/core'

export function AdminIndexDetailSettingsTab({ indexId }: { indexId: string }) {
  const { item, query, updateIndex } = useAdminFindOneIndex({ indexId })

  if (query.isLoading) {
    return <UiLoader />
  }
  if (!item) {
    return <UiError message="Index not found." />
  }

  return (
    <UiCard>
      <AdminIndexUiUpdateForm index={item} submit={updateIndex} />
    </UiCard>
  )
}
