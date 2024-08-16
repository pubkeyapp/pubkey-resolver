import { NetworkCluster } from '@pubkey-resolver/sdk'
import { lazy } from 'react'
import { useRoutes } from 'react-router-dom'

const Detail = lazy(() => import('./admin-index-entry-detail.feature'))
const List = lazy(() => import('./admin-index-entry-list.feature'))

export default function AdminIndexEntryRoutes({
  cluster,
  indexAddress,
}: {
  cluster: NetworkCluster
  indexAddress: string
}) {
  return useRoutes([
    { path: '', element: <List cluster={cluster} indexAddress={indexAddress} /> },
    { path: ':indexEntryId/*', element: <Detail /> },
  ])
}
