import { AccountAdminResolveInput, sdk } from '@pubkey-resolver/sdk'
import { useQuery } from '@tanstack/react-query'

export function useAdminGetAccountInfo(input: AccountAdminResolveInput) {
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

export function useAdminResolveAccount(input: AccountAdminResolveInput) {
  const query = useQuery({
    queryKey: ['admin', 'resolve-account', input],
    queryFn: () => sdk.adminResolveAccount({ input }).then((res) => res.data),
    retry: 0,
  })
  const item = query.data?.item ?? undefined

  return {
    item,
    query,
  }
}

export function useAdminResolveWallet(input: AccountAdminResolveInput) {
  const query = useQuery({
    queryKey: ['admin', 'resolve-wallet', input],
    queryFn: () => sdk.adminResolveWallet({ input }).then((res) => res.data),
    retry: 0,
  })
  const item = query.data?.item ?? undefined

  return {
    item,
    query,
  }
}
