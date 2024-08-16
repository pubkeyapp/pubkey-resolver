import { Paper } from '@mantine/core'
import { Account } from '@pubkey-resolver/sdk'
import { UiDebugModal, UiGroup } from '@pubkey-ui/core'
import { AccountUiItem } from './account-ui-item'

export function AccountUiGridItem({ account, to }: { account: Account; to?: string }) {
  return (
    <Paper withBorder p="md">
      <UiGroup>
        <AccountUiItem account={account} to={to} />
        <UiDebugModal data={account} />
      </UiGroup>
    </Paper>
  )
}
