import { IndexWalletAdminUpdateInput, sdk } from '@pubkey-resolver/sdk'
import { toastError, toastSuccess } from '@pubkey-ui/core'
import { useQuery } from '@tanstack/react-query'

export function useAdminFindOneIndexWallet({ indexWalletId }: { indexWalletId: string }) {
  const query = useQuery({
    queryKey: ['admin', 'find-one-index-wallet', indexWalletId],
    queryFn: () => sdk.adminFindOneIndexWallet({ indexWalletId }).then((res) => res.data),
    retry: 0,
  })
  const item = query.data?.item ?? undefined

  return {
    item,
    query,
    updateIndexWallet: async (input: IndexWalletAdminUpdateInput) =>
      sdk
        .adminUpdateIndexWallet({ indexWalletId, input })
        .then((res) => res.data)
        .then(async (res) => {
          if (res) {
            toastSuccess('IndexWallet updated')
            await query.refetch()
            return true
          }
          toastError('IndexWallet not updated')
          return false
        })
        .catch((err) => {
          toastError(err.message)
          return false
        }),
  }
}
