import { Paper } from '@mantine/core'
import { Index } from '@pubkey-resolver/sdk'
import { UiDebugModal, UiGroup } from '@pubkey-ui/core'
import { IndexUiItem } from './index-ui-item'

export function IndexUiGridItem({ index, to }: { index: Index; to?: string }) {
  return (
    <Paper withBorder p="md">
      <UiGroup>
        <IndexUiItem index={index} to={to} />
        <UiDebugModal data={index} />
      </UiGroup>
    </Paper>
  )
}
