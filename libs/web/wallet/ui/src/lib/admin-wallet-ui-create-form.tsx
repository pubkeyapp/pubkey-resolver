import { Button, Group, TextInput } from '@mantine/core'
import { useForm } from '@mantine/form'
import { WalletAdminCreateInput } from '@pubkey-resolver/sdk'
import { UiStack } from '@pubkey-ui/core'

export function AdminWalletUiCreateForm({ submit }: { submit: (res: WalletAdminCreateInput) => Promise<boolean> }) {
  const form = useForm<WalletAdminCreateInput>({
    initialValues: {
      id: '',
      label: '',
    },
  })

  return (
    <form onSubmit={form.onSubmit((values) => submit(values))}>
      <UiStack>
        <TextInput required name="id" label="id" {...form.getInputProps('id')} />
        <TextInput name="label" label="label" {...form.getInputProps('label')} />
        <Group justify="right">
          <Button type="submit">Save</Button>
        </Group>
      </UiStack>
    </form>
  )
}
