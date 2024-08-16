import { AvatarProps, Group, GroupProps, Stack, Text } from '@mantine/core'
import { Account } from '@pubkey-resolver/sdk'
import { UiAnchor, UiAnchorProps } from '@pubkey-ui/core'
import { AccountUiAvatar } from './account-ui-avatar'

export function AccountUiItem({
  anchorProps,
  avatarProps,
  groupProps,
  account,
  to,
}: {
  anchorProps?: UiAnchorProps
  avatarProps?: Omit<AvatarProps, 'src'>
  groupProps?: GroupProps
  account?: Account
  to?: string | null
}) {
  if (!account) return null

  return (
    <UiAnchor to={to ?? undefined} underline="never" {...anchorProps}>
      <Group gap="sm" {...groupProps}>
        <AccountUiAvatar account={account} {...avatarProps} />
        <Stack gap={1}>
          <Text size="lg" fw={500}>
            {account?.label}
          </Text>
        </Stack>
      </Group>
    </UiAnchor>
  )
}
