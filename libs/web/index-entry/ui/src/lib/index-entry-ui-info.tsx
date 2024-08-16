import { IndexEntry } from '@pubkey-resolver/sdk'
import { UiInfoItems, UiInfoTable, UiTime } from '@pubkey-ui/core'

export function IndexEntryUiInfo({ indexEntry }: { indexEntry?: IndexEntry }) {
  if (!indexEntry) return null

  const items: UiInfoItems = [
    ['label', indexEntry.label],

    ['Created At', <UiTime size="xs" c="dimmed" date={new Date(indexEntry.createdAt ?? '0')} />],
    ['Updated At', <UiTime size="xs" c="dimmed" date={new Date(indexEntry.updatedAt ?? '0')} />],
  ]

  return <UiInfoTable items={items} />
}
