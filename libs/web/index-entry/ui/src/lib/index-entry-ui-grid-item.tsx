import { Paper } from '@mantine/core'
import { IndexEntry } from '@pubkey-resolver/sdk'
import { UiDebugModal, UiGroup } from '@pubkey-ui/core'
import { IndexEntryUiItem } from './index-entry-ui-item'

export function IndexEntryUiGridItem({ indexEntry, to }: { indexEntry: IndexEntry; to?: string }) {
  return (
    <Paper withBorder p="md">
      <UiGroup>
        <IndexEntryUiItem indexEntry={indexEntry} to={to} />
        <UiDebugModal data={indexEntry} />
      </UiGroup>
    </Paper>
  )
}
