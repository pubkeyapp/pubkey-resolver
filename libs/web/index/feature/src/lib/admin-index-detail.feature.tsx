import { ActionIcon, Group, TextInput } from '@mantine/core'
import { Index } from '@pubkey-resolver/sdk'
import { useAdminFindOneIndex, useAdminResolveWallet } from '@pubkey-resolver/web-index-data-access'
import { AdminIndexEntryFeature } from '@pubkey-resolver/web-index-entry-feature'
import { IndexUiItem } from '@pubkey-resolver/web-index-ui'
import {
  UiBack,
  UiCard,
  UiDebug,
  UiDebugModal,
  UiError,
  UiLoader,
  UiPage,
  UiTabRoute,
  UiTabRoutes,
} from '@pubkey-ui/core'
import { IconSearch } from '@tabler/icons-react'
import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { AdminIndexDetailInfoTab } from './admin-index-detail-info.tab'
import { AdminIndexDetailSettingsTab } from './admin-index-detail-settings.tab'

export default function AdminIndexDetailFeature() {
  const { indexId } = useParams<{ indexId: string }>() as { indexId: string }
  const { item, query } = useAdminFindOneIndex({ indexId })

  if (query.isLoading) {
    return <UiLoader />
  }
  if (!item) {
    return <UiError message="Index not found." />
  }

  const tabs: UiTabRoute[] = [
    {
      path: 'info',
      label: 'Info',
      element: <AdminIndexDetailInfoTab indexId={indexId} />,
    },
    {
      path: 'settings',
      label: 'Settings',
      element: <AdminIndexDetailSettingsTab indexId={indexId} />,
    },
    {
      path: 'resolve',
      label: 'Resolve',
      element: <AdminIndexResolveWalletFeature item={item} />,
    },
    {
      path: 'entries',
      label: 'Entries',
      element: <AdminIndexEntryFeature cluster={item.cluster} indexAddress={item.address} />,
    },
  ]

  return (
    <UiPage
      title={<IndexUiItem index={item} />}
      leftAction={<UiBack />}
      rightAction={
        <Group>
          <UiDebugModal data={item} />
        </Group>
      }
    >
      <UiTabRoutes tabs={tabs} />
    </UiPage>
  )
}

function AdminIndexResolveWalletFeature({ item }: { item: Index }) {
  const mutation = useAdminResolveWallet({ address: item.address, cluster: item.cluster })
  const [wallet, setWallet] = useState<string | undefined>()
  const [output, setOutput] = useState<unknown | undefined>(undefined)

  function submit(wallet: string | undefined) {
    if (!wallet) {
      return
    }
    setOutput(undefined)
    mutation
      .mutateAsync(wallet)
      .then((res) => {
        setOutput({ res: res?.item })
      })
      .catch((err) => {
        setOutput({ err: `${err}` })
      })
  }

  return (
    <UiCard>
      <TextInput
        value={wallet}
        label="Wallet address"
        description="The address of the wallet to resolve for this index."
        onChange={(e) => setWallet(e.currentTarget.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            submit(wallet)
          }
        }}
        rightSection={
          <ActionIcon disabled={!wallet} loading={mutation.isPending} onClick={() => submit(wallet)}>
            <IconSearch size={16} />
          </ActionIcon>
        }
      />
      {mutation.isPending ? <UiLoader /> : <UiDebug data={output ?? 'None'} open />}
    </UiCard>
  )
}
