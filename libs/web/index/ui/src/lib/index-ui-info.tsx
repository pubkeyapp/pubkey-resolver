import { Index } from '@pubkey-resolver/sdk'
import { UiDebug, UiInfoItems, UiInfoTable, UiTime } from '@pubkey-ui/core'

export function IndexUiInfo({ index }: { index?: Index }) {
  if (!index) return null

  const items: UiInfoItems = [
    ['type', index.type],
    ['cluster', index.cluster],
    ['address', index.address],
    ['program', index.program],
    ['label', index.label],
    ['data', index.data ? <UiDebug data={index.data} /> : 'Not found'],
    ['dataHash', index.dataHash ? index.dataHash : 'Not found'],
    ['Created At', <UiTime size="xs" c="dimmed" date={new Date(index.createdAt ?? '0')} />],
    ['Updated At', <UiTime size="xs" c="dimmed" date={new Date(index.updatedAt ?? '0')} />],
  ]

  return <UiInfoTable items={items} />
}
