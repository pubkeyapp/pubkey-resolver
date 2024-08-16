import { IndexAdminResolveInput, sdk } from '@pubkey-resolver/sdk'
import { useMutation, useQuery } from '@tanstack/react-query'

export function useAdminGetAccountInfo(input: IndexAdminResolveInput) {
  const query = useQuery({
    queryKey: ['admin', 'get-account-info', input],
    queryFn: () => sdk.adminGetAccountInfo({ input }).then((res) => res.data),
    retry: 0,
  })
  const item = query.data?.item ?? undefined

  return {
    item,
    query,
  }
}

export function useAdminResolveWallet(input: IndexAdminResolveInput) {
  return useMutation({
    mutationFn: (wallet: string) => sdk.adminResolveWallet({ input, wallet }).then((res) => res.data),
  })
}
