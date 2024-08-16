import { Button, Group, Select, TextInput } from '@mantine/core'
import { useForm } from '@mantine/form'
import { IndexAdminCreateInput, IndexType, NetworkCluster } from '@pubkey-resolver/sdk'
import { getEnumOptions, UiStack } from '@pubkey-ui/core'

export function AdminIndexUiCreateForm({ submit }: { submit: (res: IndexAdminCreateInput) => Promise<boolean> }) {
  const form = useForm<IndexAdminCreateInput>({
    initialValues: {
      type: IndexType.SolanaCollection,
      cluster: NetworkCluster.SolanaMainnet,
      address: '',
      label: '',
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
        <Select required name="type" label="Type" data={getEnumOptions(IndexType)} {...form.getInputProps('type')} />
        <TextInput required name="address" label="address" {...form.getInputProps('address')} />
        <TextInput name="label" label="label" {...form.getInputProps('label')} />
        <Group justify="right">
          <Button type="submit">Save</Button>
        </Group>
      </UiStack>
    </form>
  )
}
