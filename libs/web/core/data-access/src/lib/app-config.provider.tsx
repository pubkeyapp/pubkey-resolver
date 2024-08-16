import { AppConfig, IdentityProvider } from '@pubkey-resolver/sdk'
import { toastError } from '@pubkey-ui/core'
import { createContext, ReactNode, useContext, useMemo } from 'react'

// This is provided by /api/__/env.js included in index.html
const appConfig: AppConfig = (window as unknown as { __env: AppConfig }).__env

if (!appConfig) {
  toastError('App config not found')
}

export interface AuthProviderContext {
  appConfig?: AppConfig | undefined
  authEnabled: boolean
  enabledProviders: IdentityProvider[]
}

const Context = createContext<AuthProviderContext>({} as AuthProviderContext)

export function AppConfigProvider({ children }: { children: ReactNode }) {
  const authEnabled = useMemo(() => {
    if (!appConfig) return false
    const { authGithubEnabled, authPasswordEnabled, authRegisterEnabled } = appConfig as AppConfig
    return authGithubEnabled || authRegisterEnabled || authPasswordEnabled
  }, [appConfig])

  const enabledProviders: IdentityProvider[] = useMemo(
    () =>
      appConfig ? ([appConfig.authGithubEnabled && IdentityProvider.GitHub].filter(Boolean) as IdentityProvider[]) : [],
    [appConfig],
  )

  const value: AuthProviderContext = {
    appConfig,
    authEnabled,
    enabledProviders,
  }

  return <Context.Provider value={value}>{children}</Context.Provider>
}

export function useAppConfig() {
  return useContext(Context)
}
