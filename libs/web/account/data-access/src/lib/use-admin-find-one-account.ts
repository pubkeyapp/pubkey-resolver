import { AccountAdminUpdateInput, sdk } from '@pubkey-resolver/sdk'
import { toastError, toastSuccess } from '@pubkey-ui/core'
import { useQuery } from '@tanstack/react-query'

export function useAdminFindOneAccount({ accountId }: { accountId: string }) {
  const query = useQuery({
    queryKey: ['admin', 'find-one-account', accountId],
    queryFn: () => sdk.adminFindOneAccount({ accountId }).then((res) => res.data),
    retry: 0,
  })
  const item = query.data?.item ?? undefined

  return {
    item,
    query,
    updateAccount: async (input: AccountAdminUpdateInput) =>
      sdk
        .adminUpdateAccount({ accountId, input })
        .then((res) => res.data)
        .then(async (res) => {
          if (res) {
            toastSuccess('Account updated')
            await query.refetch()
            return true
          }
          toastError('Account not updated')
          return false
        })
        .catch((err) => {
          toastError(err.message)
          return false
        }),
  }
}
