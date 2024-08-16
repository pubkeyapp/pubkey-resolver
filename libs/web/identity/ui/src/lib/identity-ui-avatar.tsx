import { Avatar, Tooltip } from '@mantine/core'
import { ellipsify, Identity } from '@pubkey-resolver/sdk'

export function IdentityUiAvatar({ item, withTooltip = false }: { item: Identity; withTooltip?: boolean }) {
  const content = item.profile?.avatarUrl ? (
    <Avatar radius={100} src={item.profile?.avatarUrl} alt={`${item.provider} avatar`} />
  ) : (
    <Avatar radius={100}>{item.profile?.username.substring(0, 1)}</Avatar>
  )

  return withTooltip ? (
    <Tooltip label={`${item.profile?.username ?? ellipsify(item.providerId)} on ${item.provider}`} withArrow>
      {content}
    </Tooltip>
  ) : (
    content
  )
}
