import { Index } from '@pubkey-resolver/sdk'
import { UiAvatar, UiAvatarProps } from '@pubkey-ui/core'

export type IndexUiAvatarProps = UiAvatarProps & {
  index?: Index
}

export function IndexUiAvatar({ index, ...props }: IndexUiAvatarProps) {
  return <UiAvatar url={undefined} name={index?.address} {...props} />
}
