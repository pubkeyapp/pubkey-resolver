import { UiDashboard } from '@pubkey-resolver/web-core-ui'
import { UserIndexFeature } from '@pubkey-resolver/web-index-feature'
import { SettingsFeature } from '@pubkey-resolver/web-settings-feature'
import { UserFeature } from '@pubkey-resolver/web-user-feature'
import { UserWalletFeature } from '@pubkey-resolver/web-wallet-feature'
import { UiDashboardItem, UiNotFound } from '@pubkey-ui/core'
import { IconFileText, IconSettings, IconWallet } from '@tabler/icons-react'
import { Navigate, RouteObject, useRoutes } from 'react-router-dom'

const links: UiDashboardItem[] = [
  // User Dashboard Links are added by the web-crud generator
  { label: 'Indexes', icon: IconFileText, to: '/indexes' },
  { label: 'Settings', icon: IconSettings, to: '/settings' },
  { label: 'Wallets', icon: IconWallet, to: '/wallets' },
]

const routes: RouteObject[] = [
  // User Dashboard Routes are added by the web-crud generator
  { path: '/settings/*', element: <SettingsFeature /> },
  { path: '/u/*', element: <UserFeature /> },
  { path: '/indexes/*', element: <UserIndexFeature /> },
  { path: '/wallets/*', element: <UserWalletFeature /> },
]

export default function WebCoreRoutesUser() {
  return useRoutes([
    { index: true, element: <Navigate to="dashboard" replace /> },
    { path: '/dashboard', element: <UiDashboard links={links} /> },
    ...routes,
    { path: '*', element: <UiNotFound to="/dashboard" /> },
  ])
}
