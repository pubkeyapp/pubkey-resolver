import { lazy } from 'react'
import { useRoutes } from 'react-router-dom'

const Create = lazy(() => import('./admin-index-create.feature'))
const Detail = lazy(() => import('./admin-index-detail.feature'))
const List = lazy(() => import('./admin-index-list.feature'))
const Resolve = lazy(() => import('./admin-index-resolve.feature'))

export default function AdminIndexRoutes() {
  return useRoutes([
    { path: '', element: <List /> },
    { path: 'create', element: <Create /> },
    { path: 'resolve', element: <Resolve /> },
    { path: ':indexId/*', element: <Detail /> },
  ])
}
