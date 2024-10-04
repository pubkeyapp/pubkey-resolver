import { lazy } from 'react'
import { useRoutes } from 'react-router-dom'

const Create = lazy(() => import('./admin-wallet-create.feature'))
const Detail = lazy(() => import('./admin-wallet-detail.feature'))
const List = lazy(() => import('./admin-wallet-list.feature'))

export default function AdminWalletRoutes() {
  return useRoutes([
    { path: '', element: <List /> },
    { path: 'create', element: <Create /> },
    { path: ':walletId/*', element: <Detail /> },
  ])
}
