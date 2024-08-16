import { sdk } from '@pubkey-resolver/sdk'
import { useQuery } from '@tanstack/react-query'

export function useUserFindOneIndexEntry({ indexEntryId }: { indexEntryId: string }) {
  const query = useQuery({
    queryKey: ['user', 'find-one-index-entry', indexEntryId],
    queryFn: () => sdk.userFindOneIndexEntry({ indexEntryId }).then((res) => res.data),
    retry: 0,
  })
  const item = query.data?.item ?? undefined

  return {
    item,
    query,
  }
}
