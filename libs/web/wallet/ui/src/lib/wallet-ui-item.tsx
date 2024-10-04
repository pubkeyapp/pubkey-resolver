import { AvatarProps, Group, GroupProps, Stack, Text } from '@mantine/core'
import { Wallet } from '@pubkey-resolver/sdk'
import { UiAnchor, UiAnchorProps } from '@pubkey-ui/core'
import { WalletUiAvatar } from './wallet-ui-avatar'

export function WalletUiItem({
  anchorProps,
  avatarProps,
  groupProps,
  wallet,
  to,
}: {
  anchorProps?: UiAnchorProps
  avatarProps?: Omit<AvatarProps, 'src'>
  groupProps?: GroupProps
  wallet?: Wallet
  to?: string | null
}) {
  if (!wallet) return null

  return (
    <UiAnchor to={to ?? undefined} underline="never" {...anchorProps}>
      <Group gap="sm" {...groupProps}>
        <WalletUiAvatar wallet={wallet} {...avatarProps} />
        <Stack gap={0}>
          <Text size="lg" fw={500}>
            {wallet?.label}
          </Text>
          <Text size="xs" c="dimmed" ff="monospace">
            {wallet?.id}
          </Text>
        </Stack>
      </Group>
    </UiAnchor>
  )
}
