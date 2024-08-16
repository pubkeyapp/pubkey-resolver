import { Button, Group, Select, TextInput } from '@mantine/core'
import { useForm } from '@mantine/form'
import { IndexAdminResolveInput, NetworkCluster } from '@pubkey-resolver/sdk'
import { getEnumOptions, UiStack } from '@pubkey-ui/core'

export function AdminIndexUiResolveForm({ submit }: { submit: (res: IndexAdminResolveInput) => Promise<boolean> }) {
  const form = useForm<IndexAdminResolveInput>({
    initialValues: {
      cluster: NetworkCluster.SolanaMainnet,
      address: '',
    },
  })

  return (
    <form onSubmit={form.onSubmit((values) => submit(values))}>
      <UiStack>
        <Select
          required
          name="cluster"
          label="Cluster"
          data={getEnumOptions(NetworkCluster)}
          {...form.getInputProps('cluster')}
        />
        <TextInput required name="address" label="address" {...form.getInputProps('address')} />
        <Group justify="right">
          <Button type="submit">Resolve</Button>
        </Group>
      </UiStack>
    </form>
  )
}
