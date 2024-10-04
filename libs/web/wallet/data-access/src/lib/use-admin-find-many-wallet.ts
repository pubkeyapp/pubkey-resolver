import { sdk, WalletAdminCreateInput, WalletAdminFindManyInput } from '@pubkey-resolver/sdk'
import { toastError, toastSuccess } from '@pubkey-ui/core'
import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'

export function useAdminFindManyWallet(props: Partial<WalletAdminFindManyInput> = {}) {
  const [limit, setLimit] = useState(props?.limit ?? 10)
  const [page, setPage] = useState(props?.page ?? 1)
  const [search, setSearch] = useState<string>(props?.search ?? '')

  const input: WalletAdminFindManyInput = { page, limit, search }
  const query = useQuery({
    queryKey: ['admin', 'find-many-wallet', input],
    queryFn: () => sdk.adminFindManyWallet({ input }).then((res) => res.data),
  })
  const total = query.data?.paging?.meta?.totalCount ?? 0
  const items = query.data?.paging.data ?? []

  return {
    items,
    query,
    pagination: {
      page,
      setPage,
      limit,
      setLimit,
      total,
    },
    setSearch,
    createWallet: (input: WalletAdminCreateInput) =>
      sdk
        .adminCreateWallet({ input })
        .then((res) => res.data)
        .then((res) => {
          if (res.created) {
            toastSuccess(`Wallet created`)
          } else {
            toastError(`Wallet not created`)
          }
          return res.created
        })
        .catch((err) => {
          toastError(err.message)
          return undefined
        }),
    deleteWallet: (walletId: string) =>
      sdk.adminDeleteWallet({ walletId }).then(() => {
        toastSuccess('Wallet deleted')
        return query.refetch()
      }),
  }
}
