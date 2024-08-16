import { lazy } from 'react'
export const AdminAccountFeature = lazy(() => import('./lib/admin-account.routes'))

export const UserAccountFeature = lazy(() => import('./lib/user-account.routes'))
