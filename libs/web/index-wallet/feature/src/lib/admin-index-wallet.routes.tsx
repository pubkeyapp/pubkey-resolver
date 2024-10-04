import { lazy } from 'react'
import { useRoutes } from 'react-router-dom'

const Detail = lazy(() => import('./admin-index-wallet-detail.feature'))
const List = lazy(() => import('./admin-index-wallet-list.feature'))

export default function AdminIndexWalletRoutes({ walletId }: { walletId: string }) {
  return useRoutes([
    { path: '', element: <List walletId={walletId} /> },
    { path: ':indexWalletId/*', element: <Detail /> },
  ])
}
