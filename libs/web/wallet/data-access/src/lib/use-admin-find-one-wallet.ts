import { sdk, WalletAdminUpdateInput } from '@pubkey-resolver/sdk'
import { toastError, toastSuccess } from '@pubkey-ui/core'
import { useQuery } from '@tanstack/react-query'

export function useAdminFindOneWallet({ walletId }: { walletId: string }) {
  const query = useQuery({
    queryKey: ['admin', 'find-one-wallet', walletId],
    queryFn: () => sdk.adminFindOneWallet({ walletId }).then((res) => res.data),
    retry: 0,
  })
  const item = query.data?.item ?? undefined

  return {
    item,
    query,
    updateWallet: async (input: WalletAdminUpdateInput) =>
      sdk
        .adminUpdateWallet({ walletId, input })
        .then((res) => res.data)
        .then(async (res) => {
          if (res) {
            toastSuccess('Wallet updated')
            await query.refetch()
            return true
          }
          toastError('Wallet not updated')
          return false
        })
        .catch((err) => {
          toastError(err.message)
          return false
        }),
  }
}
