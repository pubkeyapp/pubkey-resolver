import { IndexWalletUserFindManyInput, sdk } from '@pubkey-resolver/sdk'
import { toastSuccess } from '@pubkey-ui/core'
import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'

export function useUserFindManyIndexWallet(props: Partial<IndexWalletUserFindManyInput> & { walletId: string }) {
  const [limit, setLimit] = useState(props?.limit ?? 10)
  const [page, setPage] = useState(props?.page ?? 1)
  const [search, setSearch] = useState<string>(props?.search ?? '')

  const input: IndexWalletUserFindManyInput = { page, limit, search, walletId: props.walletId }
  const query = useQuery({
    queryKey: ['user', 'find-many-index-wallet', input],
    queryFn: () => sdk.userFindManyIndexWallet({ input }).then((res) => res.data),
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
    deleteIndexWallet: (indexWalletId: string) =>
      sdk.userDeleteIndexWallet({ indexWalletId }).then(() => {
        toastSuccess('IndexWallet deleted')
        return query.refetch()
      }),
  }
}
