import { ActionIcon, TextInput } from '@mantine/core'
import { Index } from '@pubkey-resolver/sdk'
import { useAdminResolveWallet } from '@pubkey-resolver/web-index-data-access'
import { UiCard, UiDebug, UiLoader } from '@pubkey-ui/core'
import { IconSearch } from '@tabler/icons-react'
import { useState } from 'react'

export function AdminIndexResolveWalletFeature({ item }: { item: Index }) {
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
