import { Group } from '@mantine/core'
import { IndexUiItem } from '@pubkey-resolver/web-index-ui'
import { useAdminFindOneIndexWallet } from '@pubkey-resolver/web-index-wallet-data-access'
import { AdminIndexWalletUiUpdateForm, IndexWalletUiInfo } from '@pubkey-resolver/web-index-wallet-ui'
import { UiBack, UiCard, UiDebugModal, UiError, UiLoader, UiPage } from '@pubkey-ui/core'
import { useParams } from 'react-router-dom'

export default function AdminIndexWalletDetailFeature() {
  const { indexWalletId } = useParams<{ indexWalletId: string }>() as { indexWalletId: string }
  const { item, query, updateIndexWallet } = useAdminFindOneIndexWallet({ indexWalletId })

  if (query.isLoading) {
    return <UiLoader />
  }
  if (!item) {
    return <UiError message="IndexWallet not found." />
  }

  return (
    <UiPage
      title={item.index ? <IndexUiItem index={item.index} /> : null}
      leftAction={<UiBack />}
      rightAction={
        <Group>
          <UiDebugModal data={item} />
        </Group>
      }
    >
      <UiCard>
        <IndexWalletUiInfo indexWallet={item} />
      </UiCard>
      <UiCard>
        <AdminIndexWalletUiUpdateForm indexWallet={item} submit={updateIndexWallet} />
      </UiCard>
    </UiPage>
  )
}
