import { lazy } from 'react'
export const AdminIndexEntryFeature = lazy(() => import('./lib/admin-index-entry.routes'))

export const UserIndexEntryFeature = lazy(() => import('./lib/user-index-entry.routes'))
