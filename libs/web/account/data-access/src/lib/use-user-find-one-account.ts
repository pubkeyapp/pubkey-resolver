import { sdk } from '@pubkey-resolver/sdk'
import { useQuery } from '@tanstack/react-query'

export function useUserFindOneAccount({ accountId }: { accountId: string }) {
  const query = useQuery({
    queryKey: ['user', 'find-one-account', accountId],
    queryFn: () => sdk.userFindOneAccount({ accountId }).then((res) => res.data),
    retry: 0,
  })
  const item = query.data?.item ?? undefined

  return {
    item,
    query,
  }
}
