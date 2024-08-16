import { sdk } from '@pubkey-resolver/sdk'
import { useQuery } from '@tanstack/react-query'

export function useAdminFindOneIndexEntry({ indexEntryId }: { indexEntryId: string }) {
  const query = useQuery({
    queryKey: ['admin', 'find-one-index-entry', indexEntryId],
    queryFn: () => sdk.adminFindOneIndexEntry({ indexEntryId }).then((res) => res.data),
    retry: 0,
  })
  const item = query.data?.item ?? undefined

  return {
    item,
    query,
  }
}
