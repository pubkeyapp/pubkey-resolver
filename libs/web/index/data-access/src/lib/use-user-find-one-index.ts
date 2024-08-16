import { sdk } from '@pubkey-resolver/sdk'
import { useQuery } from '@tanstack/react-query'

export function useUserFindOneIndex({ indexId }: { indexId: string }) {
  const query = useQuery({
    queryKey: ['user', 'find-one-index', indexId],
    queryFn: () => sdk.userFindOneIndex({ indexId }).then((res) => res.data),
    retry: 0,
  })
  const item = query.data?.item ?? undefined

  return {
    item,
    query,
  }
}
