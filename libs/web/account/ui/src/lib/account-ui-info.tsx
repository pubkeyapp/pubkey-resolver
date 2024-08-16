import { Account } from '@pubkey-resolver/sdk'
import { UiDebug, UiInfoItems, UiInfoTable, UiTime } from '@pubkey-ui/core'

export function AccountUiInfo({ account }: { account?: Account }) {
  if (!account) return null

  const items: UiInfoItems = [
    ['type', account.type],
    ['cluster', account.cluster],
    ['address', account.address],
    ['program', account.program],
    ['label', account.label],
    ['data', account.data ? <UiDebug data={account.data} /> : 'Not found'],
    ['dataHash', account.dataHash ? account.dataHash : 'Not found'],
    ['Created At', <UiTime size="xs" c="dimmed" date={new Date(account.createdAt ?? '0')} />],
    ['Updated At', <UiTime size="xs" c="dimmed" date={new Date(account.updatedAt ?? '0')} />],
  ]

  return <UiInfoTable items={items} />
}
