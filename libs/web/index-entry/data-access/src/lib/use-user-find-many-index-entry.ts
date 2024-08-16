import { IndexEntryUserFindManyInput, sdk } from '@pubkey-resolver/sdk'
import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'

export function useUserFindManyIndexEntry(props: IndexEntryUserFindManyInput) {
  const [limit, setLimit] = useState(props?.limit ?? 10)
  const [page, setPage] = useState(props?.page ?? 1)
  const [search, setSearch] = useState<string>(props?.search ?? '')

  const input: IndexEntryUserFindManyInput = {
    page,
    limit,
    search,
    cluster: props.cluster,
    indexAddress: props.indexAddress,
  }
  const query = useQuery({
    queryKey: ['user', 'find-many-index-entry', input],
    queryFn: () => sdk.userFindManyIndexEntry({ input }).then((res) => res.data),
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
  }
}
