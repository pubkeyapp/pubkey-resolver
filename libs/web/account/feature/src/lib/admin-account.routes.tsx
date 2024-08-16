import { lazy } from 'react'
import { useRoutes } from 'react-router-dom'

const Create = lazy(() => import('./admin-account-create.feature'))
const Detail = lazy(() => import('./admin-account-detail.feature'))
const List = lazy(() => import('./admin-account-list.feature'))
const Resolve = lazy(() => import('./admin-account-resolve.feature'))

export default function AdminAccountRoutes() {
  return useRoutes([
    { path: '', element: <List /> },
    { path: 'create', element: <Create /> },
    { path: 'resolve', element: <Resolve /> },
    { path: ':accountId/*', element: <Detail /> },
  ])
}
