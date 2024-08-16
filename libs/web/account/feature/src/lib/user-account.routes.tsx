import { lazy } from 'react'
import { useRoutes } from 'react-router-dom'

const Detail = lazy(() => import('./user-account-detail.feature'))
const List = lazy(() => import('./user-account-list.feature'))

export default function UserAccountRoutes() {
  return useRoutes([
    { path: '', element: <List /> },
    { path: ':accountId/*', element: <Detail /> },
  ])
}
