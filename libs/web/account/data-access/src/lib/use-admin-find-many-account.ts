import {
  AccountAdminCreateInput,
  AccountAdminFindManyInput,
  AccountAdminResolveInput,
  AccountType,
  NetworkCluster,
  sdk,
} from '@pubkey-resolver/sdk'
import { toastError, toastSuccess } from '@pubkey-ui/core'
import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'

export function useAdminFindManyAccount(props: Partial<AccountAdminFindManyInput> = {}) {
  const [cluster, setCluster] = useState<NetworkCluster | undefined>(undefined)
  const [type, setType] = useState<AccountType | undefined>(undefined)
  const [limit, setLimit] = useState(props?.limit ?? 10)
  const [page, setPage] = useState(props?.page ?? 1)
  const [search, setSearch] = useState<string>(props?.search ?? '')

  const input: AccountAdminFindManyInput = { page, limit, search, cluster, type }
  const query = useQuery({
    queryKey: ['admin', 'find-many-account', input],
    queryFn: () => sdk.adminFindManyAccount({ input }).then((res) => res.data),
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
    createAccount: (input: AccountAdminCreateInput) =>
      sdk
        .adminCreateAccount({ input })
        .then((res) => res.data)
        .then(async (res) => {
          if (res.created) {
            toastSuccess(`Account created`)
          } else {
            toastError(`Account not created`)
          }
          await query.refetch()
          return res.created
        })
        .catch((err) => {
          toastError(err.message)
          return undefined
        }),
    resolveAccount: (input: AccountAdminResolveInput) =>
      sdk
        .adminResolveAccount({ input })
        .then((res) => {
          if (res.data?.item) {
            toastSuccess('Account resolved')
          } else {
            toastError('Account not resolved')
          }
          return res.data?.item
        })
        .catch((err) => {
          toastError(err.message)
          return undefined
        }),
    deleteAccount: (accountId: string) =>
      sdk.adminDeleteAccount({ accountId }).then(() => {
        toastSuccess('Account deleted')
        return query.refetch()
      }),
  }
}
