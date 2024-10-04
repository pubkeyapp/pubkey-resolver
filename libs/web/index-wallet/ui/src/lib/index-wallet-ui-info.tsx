import { IndexWallet } from '@pubkey-resolver/sdk'
import { UiInfoItems, UiInfoTable, UiTime } from '@pubkey-ui/core'

export function IndexWalletUiInfo({ indexWallet }: { indexWallet?: IndexWallet }) {
  if (!indexWallet) return null

  const items: UiInfoItems = [
    ['name', indexWallet.index?.label],

    ['Created At', <UiTime size="xs" c="dimmed" date={new Date(indexWallet.createdAt ?? '0')} />],
    ['Updated At', <UiTime size="xs" c="dimmed" date={new Date(indexWallet.updatedAt ?? '0')} />],
  ]

  return <UiInfoTable items={items} />
}
