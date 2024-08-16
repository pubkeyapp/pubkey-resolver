import { Button, Group, Select, TextInput } from '@mantine/core'
import { useForm } from '@mantine/form'
import { AccountAdminCreateInput, AccountType, NetworkCluster } from '@pubkey-resolver/sdk'
import { getEnumOptions, UiStack } from '@pubkey-ui/core'

export function AdminAccountUiCreateForm({ submit }: { submit: (res: AccountAdminCreateInput) => Promise<boolean> }) {
  const form = useForm<AccountAdminCreateInput>({
    initialValues: {
      type: AccountType.SolanaNonFungible,
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
        <Select required name="type" label="Type" data={getEnumOptions(AccountType)} {...form.getInputProps('type')} />
        <TextInput required name="address" label="address" {...form.getInputProps('address')} />
        <TextInput name="label" label="label" {...form.getInputProps('label')} />
        <Group justify="right">
          <Button type="submit">Save</Button>
        </Group>
      </UiStack>
    </form>
  )
}
