import { Wallet } from '@pubkey-resolver/sdk'
import { UiInfoItems, UiInfoTable, UiTime } from '@pubkey-ui/core'

export function WalletUiInfo({ wallet }: { wallet?: Wallet }) {
  if (!wallet) return null

  const items: UiInfoItems = [
    ['id', wallet.id],
    ['label', wallet.label],
    ['Created At', <UiTime size="xs" c="dimmed" date={new Date(wallet.createdAt ?? '0')} />],
    ['Updated At', <UiTime size="xs" c="dimmed" date={new Date(wallet.updatedAt ?? '0')} />],
  ]

  return <UiInfoTable items={items} />
}
