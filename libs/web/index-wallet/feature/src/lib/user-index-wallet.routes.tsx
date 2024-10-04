import { lazy } from 'react'
import { useRoutes } from 'react-router-dom'

const Detail = lazy(() => import('./user-index-wallet-detail.feature'))
const List = lazy(() => import('./user-index-wallet-list.feature'))

export default function UserIndexWalletRoutes({ walletId }: { walletId: string }) {
  return useRoutes([
    { path: '', element: <List walletId={walletId} /> },
    { path: ':indexWalletId/*', element: <Detail /> },
  ])
}
