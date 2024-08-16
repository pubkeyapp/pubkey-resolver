import { Account } from '@pubkey-resolver/sdk'
import { UiAvatar, UiAvatarProps } from '@pubkey-ui/core'

export type AccountUiAvatarProps = UiAvatarProps & {
  account?: Account
}

export function AccountUiAvatar({ account, ...props }: AccountUiAvatarProps) {
  return <UiAvatar url={undefined} name={account?.address} {...props} />
}
