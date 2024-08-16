import { IdentityProvider } from '@pubkey-resolver/sdk'
import { IconBrandGithub, IconQuestionMark } from '@tabler/icons-react'

export function IdentityUiIcon({ provider, size }: { provider: IdentityProvider; size?: number }) {
  switch (provider) {
    case IdentityProvider.GitHub:
      return <IconBrandGithub size={size} />
    default:
      return <IconQuestionMark size={size} />
  }
}
