import { AvatarProps, Group, GroupProps, Stack, Text } from '@mantine/core'
import { Index } from '@pubkey-resolver/sdk'
import { UiAnchor, UiAnchorProps } from '@pubkey-ui/core'
import { IndexUiAvatar } from './index-ui-avatar'

export function IndexUiItem({
  anchorProps,
  avatarProps,
  groupProps,
  index,
  to,
}: {
  anchorProps?: UiAnchorProps
  avatarProps?: Omit<AvatarProps, 'src'>
  groupProps?: GroupProps
  index?: Index
  to?: string | null
}) {
  if (!index) return null

  return (
    <UiAnchor to={to ?? undefined} underline="never" {...anchorProps}>
      <Group gap="sm" {...groupProps}>
        <IndexUiAvatar index={index} {...avatarProps} />
        <Stack gap={1}>
          <Text size="lg" fw={500}>
            {index?.label}
          </Text>
        </Stack>
      </Group>
    </UiAnchor>
  )
}
