import { IndexEntry } from '@pubkey-resolver/sdk'
import { UiAvatar, UiAvatarProps } from '@pubkey-ui/core'

export type IndexEntryUiAvatarProps = UiAvatarProps & {
  indexEntry?: IndexEntry
}

export function IndexEntryUiAvatar({ indexEntry, ...props }: IndexEntryUiAvatarProps) {
  return <UiAvatar url={undefined} name={indexEntry?.label ?? undefined} {...props} />
}
