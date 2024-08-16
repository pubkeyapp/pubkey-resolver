import { AccountType, AccountUserFindManyInput, NetworkCluster, sdk } from '@pubkey-resolver/sdk'
import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'

export function useUserFindManyAccount(props: Partial<AccountUserFindManyInput> = {}) {
  const [cluster, setCluster] = useState<NetworkCluster | undefined>(undefined)
  const [type, setType] = useState<AccountType | undefined>(undefined)
  const [limit, setLimit] = useState(props?.limit ?? 10)
  const [page, setPage] = useState(props?.page ?? 1)
  const [search, setSearch] = useState<string>(props?.search ?? '')

  const input: AccountUserFindManyInput = { page, limit, search, cluster, type }
  const query = useQuery({
    queryKey: ['user', 'find-many-account', input],
    queryFn: () => sdk.userFindManyAccount({ input }).then((res) => res.data),
  })
  const total = query.data?.paging?.meta?.totalCount ?? 0
  const items = query.data?.paging.data ?? []

  return {
    items,
    query,
    cluster,
    setCluster,
    type,
    setType,
    pagination: {
      page,
      setPage,
      limit,
      setLimit,
      total,
    },
    setSearch,
  }
}
