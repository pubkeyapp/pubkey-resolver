import type { ButtonProps } from '@mantine/core'
import { IdentityProvider } from '@pubkey-resolver/sdk'
import { IdentityUiProviderButton } from './identity-ui-provider-button'

export function IdentityUiLoginButton({
  provider,
  refresh,
  ...props
}: ButtonProps & { provider: IdentityProvider; refresh: () => void }) {
  switch (provider) {
    case IdentityProvider.GitHub:
      return <IdentityUiProviderButton action="login" provider={provider} fullWidth {...props} />
    default:
      return null
  }
}
