import { lazy } from 'react'
import { useRoutes } from 'react-router-dom'

const Create = lazy(() => import('./user-wallet-create.feature'))
const Detail = lazy(() => import('./user-wallet-detail.feature'))
const List = lazy(() => import('./user-wallet-list.feature'))

export default function UserWalletRoutes() {
  return useRoutes([
    { path: '', element: <List /> },
    { path: 'create', element: <Create /> },
    { path: ':walletId/*', element: <Detail /> },
  ])
}
