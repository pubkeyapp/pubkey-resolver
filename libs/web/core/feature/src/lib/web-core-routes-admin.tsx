import { UiDashboard } from '@pubkey-resolver/web-core-ui'
import { DevAdminRoutes } from '@pubkey-resolver/web-dev-feature'
import { AdminIndexFeature } from '@pubkey-resolver/web-index-feature'
import { AdminUserFeature } from '@pubkey-resolver/web-user-feature'
import { AdminWalletFeature } from '@pubkey-resolver/web-wallet-feature'
import { UiDashboardItem, UiNotFound } from '@pubkey-ui/core'
import { IconFileText, IconUsers, IconWallet } from '@tabler/icons-react'
import { Navigate, RouteObject, useRoutes } from 'react-router-dom'

const links: UiDashboardItem[] = [
  // Admin Dashboard Links are added by the web-crud generator
  { label: 'Indexes', icon: IconFileText, to: '/admin/indexes' },
  { label: 'Users', icon: IconUsers, to: '/admin/users' },
  { label: 'Wallets', icon: IconWallet, to: '/admin/wallets' },
]

const routes: RouteObject[] = [
  // Admin Dashboard Routes are added by the web-crud generator
  { path: 'development/*', element: <DevAdminRoutes /> },
  { path: 'users/*', element: <AdminUserFeature /> },
  { path: '/indexes/*', element: <AdminIndexFeature /> },
  { path: '/wallets/*', element: <AdminWalletFeature /> },
]

export default function WebCoreRoutesAdmin() {
  return useRoutes([
    { index: true, element: <Navigate to="dashboard" replace /> },
    { path: '/dashboard', element: <UiDashboard links={links} /> },
    ...routes,
    { path: '*', element: <UiNotFound to="/admin" /> },
  ])
}
