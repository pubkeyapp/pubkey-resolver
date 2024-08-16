import { IdentityProvider } from '@prisma/client'
import { Identity } from '../entity/identity.entity'

export function getIdentityUrl(identity: Identity) {
  switch (identity.provider) {
    case IdentityProvider.GitHub:
      return `https://github.com/${(identity.profile as unknown as { username: string })?.username}`
    default:
      return null
  }
}
