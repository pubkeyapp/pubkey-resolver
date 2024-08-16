import {
  IndexAdminCreateInput,
  IndexAdminFindManyInput,
  IndexAdminResolveInput,
  IndexType,
  NetworkCluster,
  sdk,
} from '@pubkey-resolver/sdk'
import { toastError, toastSuccess } from '@pubkey-ui/core'
import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'

export function useAdminFindManyIndex(props: Partial<IndexAdminFindManyInput> = {}) {
  const [cluster, setCluster] = useState<NetworkCluster | undefined>(undefined)
  const [type, setType] = useState<IndexType | undefined>(undefined)
  const [limit, setLimit] = useState(props?.limit ?? 10)
  const [page, setPage] = useState(props?.page ?? 1)
  const [search, setSearch] = useState<string>(props?.search ?? '')

  const input: IndexAdminFindManyInput = { page, limit, search, cluster, type }
  const query = useQuery({
    queryKey: ['admin', 'find-many-index', input],
    queryFn: () => sdk.adminFindManyIndex({ input }).then((res) => res.data),
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
    cluster,
    setCluster,
    type,
    setType,
    setSearch,
    createIndex: (input: IndexAdminCreateInput) =>
      sdk
        .adminCreateIndex({ input })
        .then((res) => res.data)
        .then(async (res) => {
          if (res.created) {
            toastSuccess(`Index created`)
          } else {
            toastError(`Index not created`)
          }
          await query.refetch()
          return res.created
        })
        .catch((err) => {
          toastError(err.message)
          return undefined
        }),
    resolveIndex: (input: IndexAdminResolveInput) =>
      sdk
        .adminResolveIndex({ input })
        .then((res) => res.data?.item)
        .catch((err) => {
          toastError(err.message)
          return undefined
        }),
    deleteIndex: (indexId: string) =>
      sdk.adminDeleteIndex({ indexId }).then(() => {
        toastSuccess('Index deleted')
        return query.refetch()
      }),
  }
}
