import { IdentityProvider } from '@pubkey-resolver/sdk'

export function getIdentityProviderColor(provider: IdentityProvider) {
  switch (provider) {
    case IdentityProvider.GitHub:
      return '#333333'
    default:
      return '#333333'
  }
}
