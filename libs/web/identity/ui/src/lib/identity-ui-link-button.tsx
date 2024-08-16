import type { ButtonProps } from '@mantine/core'
import { Identity, IdentityProvider } from '@pubkey-resolver/sdk'
import { IdentityUiProviderButton } from './identity-ui-provider-button'

export function IdentityUiLinkButton({
  identities,
  provider,
  refresh,
  ...props
}: ButtonProps & {
  identities: Identity[]
  provider: IdentityProvider
  refresh?: () => void
}) {
  switch (provider) {
    case IdentityProvider.GitHub:
      return <IdentityUiProviderButton action="link" provider={provider} {...props} />
    default:
      return null
  }
}
