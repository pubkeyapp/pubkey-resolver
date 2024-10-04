import { AvatarProps, Group, GroupProps, Stack, Text } from '@mantine/core'
import { IndexEntry } from '@pubkey-resolver/sdk'
import { UiAnchor, UiAnchorProps } from '@pubkey-ui/core'
import { IndexEntryUiAvatar } from './index-entry-ui-avatar'

export function IndexEntryUiItem({
  anchorProps,
  avatarProps,
  groupProps,
  indexEntry,
  to,
}: {
  anchorProps?: UiAnchorProps
  avatarProps?: Omit<AvatarProps, 'src'>
  groupProps?: GroupProps
  indexEntry?: IndexEntry
  to?: string | null
}) {
  if (!indexEntry) return null

  return (
    <UiAnchor to={to ?? undefined} underline="never" {...anchorProps}>
      <Group gap="sm" {...groupProps} wrap="nowrap">
        <IndexEntryUiAvatar indexEntry={indexEntry} {...avatarProps} />
        <Stack gap={1}>
          <Text size="lg" fw={500}>
            {indexEntry?.label}
          </Text>
          <Text size="xs" c="dimmed">
            {indexEntry?.walletId}
          </Text>
        </Stack>
      </Group>
    </UiAnchor>
  )
}
