import { lazy } from 'react'
export const AdminIndexFeature = lazy(() => import('./lib/admin-index.routes'))

export const UserIndexFeature = lazy(() => import('./lib/user-index.routes'))
