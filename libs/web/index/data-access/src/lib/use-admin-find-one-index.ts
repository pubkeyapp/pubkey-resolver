import { IndexAdminUpdateInput, sdk } from '@pubkey-resolver/sdk'
import { toastError, toastSuccess } from '@pubkey-ui/core'
import { useQuery } from '@tanstack/react-query'

export function useAdminFindOneIndex({ indexId }: { indexId: string }) {
  const query = useQuery({
    queryKey: ['admin', 'find-one-index', indexId],
    queryFn: () => sdk.adminFindOneIndex({ indexId }).then((res) => res.data),
    retry: 0,
  })
  const item = query.data?.item ?? undefined

  return {
    item,
    query,
    updateIndex: async (input: IndexAdminUpdateInput) =>
      sdk
        .adminUpdateIndex({ indexId, input })
        .then((res) => res.data)
        .then(async (res) => {
          if (res) {
            toastSuccess('Index updated')
            await query.refetch()
            return true
          }
          toastError('Index not updated')
          return false
        })
        .catch((err) => {
          toastError(err.message)
          return false
        }),
  }
}
