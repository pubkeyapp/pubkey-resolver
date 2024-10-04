import { IndexWallet } from '@pubkey-resolver/sdk'
import { UiAvatar, UiAvatarProps } from '@pubkey-ui/core'

export type IndexWalletUiAvatarProps = UiAvatarProps & {
  indexWallet?: IndexWallet
}

export function IndexWalletUiAvatar({ indexWallet, ...props }: IndexWalletUiAvatarProps) {
  return <UiAvatar url={undefined} name={indexWallet?.index?.label} {...props} />
}
