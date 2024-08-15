import { useAuth } from '@pubkey-resolver/web-auth-data-access'
import { useUserFindManyIdentity } from '@pubkey-resolver/web-identity-data-access'
import { IdentityUiGroupList } from '@pubkey-resolver/web-identity-ui'
import { UiLoader, UiStack } from '@pubkey-ui/core'

export function SettingsIdentityFeature() {
  const { user } = useAuth()
  const { deleteIdentity, grouped, query } = useUserFindManyIdentity({ username: user?.username as string })

  return (
    <UiStack>
      {query.isLoading ? (
        <UiLoader />
      ) : (
        <IdentityUiGroupList grouped={grouped} deleteIdentity={deleteIdentity} refresh={() => query.refetch()} />
      )}
    </UiStack>
  )
}
