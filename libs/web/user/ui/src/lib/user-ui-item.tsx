import { AvatarProps, Group, GroupProps, Stack, Text } from '@mantine/core'
import { User } from '@pubkey-resolver/sdk'
import { UiAnchor, UiAnchorProps } from '@pubkey-ui/core'
import { UserUiAvatar } from './user-ui-avatar'

export function UserUiItem({
  anchorProps,
  avatarProps,
  groupProps,
  user,
  to,
}: {
  anchorProps?: UiAnchorProps
  avatarProps?: Omit<AvatarProps, 'src'>
  groupProps?: GroupProps
  user?: User
  to?: string | null
}) {
  if (!user) return null

  return (
    <UiAnchor to={to ?? undefined} underline="never" {...anchorProps}>
      <Group gap="sm" {...groupProps}>
        <UserUiAvatar user={user} {...avatarProps} />
        <Stack gap={1}>
          <Text size="lg" fw={500}>
            {user?.username}
          </Text>
          {user.name ? (
            <Text size="sm" c="dimmed">
              {user.name}
            </Text>
          ) : null}
        </Stack>
      </Group>
    </UiAnchor>
  )
}
