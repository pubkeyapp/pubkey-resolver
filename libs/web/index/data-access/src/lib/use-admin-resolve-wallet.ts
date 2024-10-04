import { IndexAdminResolveInput, sdk } from '@pubkey-resolver/sdk'
import { useMutation } from '@tanstack/react-query'

export function useAdminResolveWallet(input: IndexAdminResolveInput) {
  return useMutation({
    mutationFn: (wallet: string) => sdk.adminResolveWallet({ input, wallet }).then((res) => res.data),
  })
}
