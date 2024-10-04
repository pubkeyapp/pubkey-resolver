import { Paper } from '@mantine/core'
import { IndexWallet } from '@pubkey-resolver/sdk'
import { IndexUiItem } from '@pubkey-resolver/web-index-ui'
import { UiDebugModal, UiGroup } from '@pubkey-ui/core'

export function IndexWalletUiGridItem({ indexWallet, to }: { indexWallet: IndexWallet; to?: string }) {
  return (
    <Paper withBorder p="md">
      <UiGroup>
        {indexWallet.index ? <IndexUiItem index={indexWallet.index} to={to} /> : null}
        <UiDebugModal data={indexWallet} />
      </UiGroup>
    </Paper>
  )
}
