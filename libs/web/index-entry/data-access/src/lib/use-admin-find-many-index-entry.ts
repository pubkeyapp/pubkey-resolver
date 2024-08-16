import { IndexEntryAdminFindManyInput, sdk } from '@pubkey-resolver/sdk'
import { toastSuccess } from '@pubkey-ui/core'
import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'

export function useAdminFindManyIndexEntry(props: IndexEntryAdminFindManyInput) {
  const [limit, setLimit] = useState(props?.limit ?? 10)
  const [page, setPage] = useState(props?.page ?? 1)
  const [search, setSearch] = useState<string>(props?.search ?? '')

  const input: IndexEntryAdminFindManyInput = {
    page,
    limit,
    search,
    cluster: props.cluster,
    indexAddress: props.indexAddress,
  }
  const query = useQuery({
    queryKey: ['admin', 'find-many-index-entry', input],
    queryFn: () => sdk.adminFindManyIndexEntry({ input }).then((res) => res.data),
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
    deleteIndexEntry: (indexEntryId: string) =>
      sdk.adminDeleteIndexEntry({ indexEntryId }).then(() => {
        toastSuccess('IndexEntry deleted')
        return query.refetch()
      }),
  }
}
