import { lazy } from 'react'
import { useRoutes } from 'react-router-dom'

const Detail = lazy(() => import('./user-index-detail.feature'))
const List = lazy(() => import('./user-index-list.feature'))

export default function UserIndexRoutes() {
  return useRoutes([
    { path: '', element: <List /> },
    { path: ':indexId/*', element: <Detail /> },
  ])
}
