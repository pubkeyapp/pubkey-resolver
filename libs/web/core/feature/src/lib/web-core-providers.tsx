import '@pubkey-ui/core'
import '@pubkey-ui/core/index.esm.css'
import 'mantine-datatable/styles.layer.css'
import { AuthProvider } from '@pubkey-resolver/web-auth-data-access'
import { AppConfigProvider } from '@pubkey-resolver/web-core-data-access'

import { toastError, UiTheme, UiThemeProvider } from '@pubkey-ui/core'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactNode } from 'react'
import { Link } from 'react-router-dom'

const client = new QueryClient({
  defaultOptions: {
    mutations: {
      onError: () => {
        toastError(`Something went wrong`)
      },
    },
  },
})

export function WebCoreProviders({ children, theme }: { children: ReactNode; theme: UiTheme['theme'] }) {
  return (
    <UiThemeProvider link={({ children, ...props }) => <Link {...props}>{children}</Link>} theme={theme}>
      <QueryClientProvider client={client}>
        <AppConfigProvider>
          <AuthProvider>{children}</AuthProvider>
        </AppConfigProvider>
      </QueryClientProvider>
    </UiThemeProvider>
  )
}
