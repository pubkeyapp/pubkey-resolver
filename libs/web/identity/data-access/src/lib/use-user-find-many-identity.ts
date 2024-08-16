import { Identity, IdentityProvider, IdentityUserFindManyInput, sdk } from '@pubkey-resolver/sdk'
import { toastError, toastSuccess } from '@pubkey-ui/core'
import { useQuery } from '@tanstack/react-query'
import { useMemo } from 'react'

export function useUserFindManyIdentity({ username }: { username: string }) {
  const input: IdentityUserFindManyInput = useMemo(() => ({ username }), [username])
  const query = useQuery({
    queryKey: ['user', 'find-many-identity', input],
    queryFn: () => sdk.userFindManyIdentity({ input }).then((res) => res?.data),
  })

  const grouped: { provider: IdentityProvider; items: Identity[] }[] = useMemo(() => {
    if (!query.data) {
      return []
    }
    const items = query.data?.items ?? []
    return items.reduce(
      (acc, item) => {
        const existing = acc.find((x) => x.provider === item.provider)
        if (existing) {
          existing.items.push(item)
        } else {
          acc.push({ provider: item.provider, items: [item] })
        }
        return acc
      },
      [{ provider: IdentityProvider.GitHub, items: [] }] as { provider: IdentityProvider; items: Identity[] }[],
    )
  }, [query.data])

  const items = query.data?.items ?? []

  return {
    grouped,
    hasGithub: items.some((x) => x.provider === IdentityProvider.GitHub),
    items,
    query,
    deleteIdentity(identityId: string) {
      if (!window.confirm('Are you sure?')) {
        return
      }
      sdk
        .userDeleteIdentity({ identityId })
        .then(() => {
          toastSuccess('Identity deleted')
        })
        .catch((res) => {
          toastError({ title: 'Error deleting identity', message: `${res}` })
        })
        .finally(() => query.refetch())
    },
  }
}
