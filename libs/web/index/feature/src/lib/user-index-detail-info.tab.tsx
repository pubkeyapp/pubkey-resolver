import { useUserFindOneIndex } from '@pubkey-resolver/web-index-data-access'
import { IndexUiInfo } from '@pubkey-resolver/web-index-ui'
import { UiCard, UiError, UiLoader } from '@pubkey-ui/core'

export function UserIndexDetailInfoTab({ indexId }: { indexId: string }) {
  const { item, query } = useUserFindOneIndex({ indexId })

  if (query.isLoading) {
    return <UiLoader />
  }
  if (!item) {
    return <UiError message="Index not found." />
  }

  return (
    <UiCard>
      <IndexUiInfo index={item} />
    </UiCard>
  )
}
