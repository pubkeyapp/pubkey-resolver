import { lazy } from 'react'

export const AdminIndexWalletFeature = lazy(() => import('./lib/admin-index-wallet.routes'))

export const UserIndexWalletFeature = lazy(() => import('./lib/user-index-wallet.routes'))
