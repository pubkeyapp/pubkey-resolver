import { AvatarProps, Group, GroupProps, Stack, Text } from '@mantine/core'
import { IndexWallet } from '@pubkey-resolver/sdk'
import { UiAnchor, UiAnchorProps } from '@pubkey-ui/core'
import { IndexWalletUiAvatar } from './index-wallet-ui-avatar'

export function IndexWalletUiItem({
  anchorProps,
  avatarProps,
  groupProps,
  indexWallet,
  to,
}: {
  anchorProps?: UiAnchorProps
  avatarProps?: Omit<AvatarProps, 'src'>
  groupProps?: GroupProps
  indexWallet?: IndexWallet
  to?: string | null
}) {
  if (!indexWallet) return null

  return (
    <UiAnchor to={to ?? undefined} underline="never" {...anchorProps}>
      <Group gap="sm" {...groupProps}>
        <IndexWalletUiAvatar indexWallet={indexWallet} {...avatarProps} />
        <Stack gap={1}>
          <Text size="lg" fw={500}>
            {indexWallet?.index?.label}
          </Text>
        </Stack>
      </Group>
    </UiAnchor>
  )
}
