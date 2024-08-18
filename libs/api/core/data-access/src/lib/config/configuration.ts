// Remove trailing slashes from the URLs to avoid double slashes
const API_URL = getUrl('API_URL') as string

if (!API_URL) {
  throw new Error('API_URL is not set. Make sure to set it in the .env file')
}
// Infer the WEB URL from the API_URL if it's not set
const WEB_URL = getUrl('WEB_URL') ?? API_URL?.replace('/api', '')

const cookieDomains: string[] = getCookieDomains()

// Infer the cookie domain from the API_URL if it's not set
if (!cookieDomains.length) {
  const { hostname } = new URL(API_URL)
  cookieDomains.push(hostname)
}

const corsOrigins: string[] = getCorsOrigins()

export type Env = 'development' | 'production' | 'test' | 'provision'
export interface ApiCoreConfig {
  apiUrl: string
  // GitHub Authentication
  authGithubAdminIds: string[]
  authGithubClientId: string
  authGithubClientSecret: string
  authGithubEnabled: boolean
  // Username and Password Authentication
  authPasswordEnabled: boolean
  authRegisterEnabled: boolean
  // Cookies
  cookieDomains: string[]
  cookieName: string
  cookieSecure: boolean
  corsOrigins: string[]
  databaseProvision: boolean
  environment: Env
  heliusApiKey?: string
  host: string
  jwtSecret: string
  networkClusterSolanaCustom?: string
  networkClusterSolanaDevnet?: string
  networkClusterSolanaMainnet?: string
  networkClusterSolanaTestnet?: string
  port: number
  sessionSecret: string
  webUrl: string
}

export function configuration(): ApiCoreConfig {
  return {
    apiUrl: process.env['API_URL'] as string,
    authGithubAdminIds: getFromEnvironment('AUTH_GITHUB_ADMIN_IDS'),
    authGithubClientId: process.env['AUTH_GITHUB_CLIENT_ID'] as string,
    authGithubClientSecret: process.env['AUTH_GITHUB_CLIENT_SECRET'] as string,
    authGithubEnabled: process.env['AUTH_GITHUB_ENABLED'] === 'true',
    authPasswordEnabled: process.env['AUTH_PASSWORD_ENABLED'] === 'true',
    authRegisterEnabled: process.env['AUTH_REGISTER_ENABLED'] === 'true',
    cookieDomains,
    cookieName: '__session',
    cookieSecure: process.env['COOKIE_SECURE'] === 'true',
    corsOrigins,
    databaseProvision: process.env['DATABASE_PROVISION'] === 'true',
    environment: (process.env['NODE_ENV'] as Env) || 'development',
    heliusApiKey: process.env['HELIUS_API_KEY'],
    host: process.env['HOST'] as string,
    jwtSecret: process.env['JWT_SECRET'] as string,
    networkClusterSolanaCustom: process.env['NETWORK_CLUSTER_SOLANA_CUSTOM'],
    networkClusterSolanaDevnet: process.env['NETWORK_CLUSTER_SOLANA_DEVNET'],
    networkClusterSolanaMainnet: process.env['NETWORK_CLUSTER_SOLANA_MAINNET'],
    networkClusterSolanaTestnet: process.env['NETWORK_CLUSTER_SOLANA_TESTNET'],
    port: parseInt(process.env['PORT'] as string, 10) || 3000,
    sessionSecret: process.env['SESSION_SECRET'] as string,
    webUrl: WEB_URL,
  }
}

// Get the cookie domains from the ENV
function getCookieDomains() {
  return getFromEnvironment('COOKIE_DOMAINS').filter(Boolean)
}

// Get the origins from the ENV
function getCorsOrigins() {
  return getFromEnvironment('CORS_ORIGINS').filter(Boolean)
}

// Get the values from the ENV
function getFromEnvironment(key: string) {
  return (process.env[key]?.includes(',') ? (process.env[key]?.split(',') as string[]) : [process.env[key]]) as string[]
}

function getUrl(key: string) {
  return process.env[key]?.replace(/\/$/, '')
}
