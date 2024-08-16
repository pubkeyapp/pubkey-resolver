import { Button, Group, TextInput } from '@mantine/core'
import { useForm } from '@mantine/form'
import { Account, AccountAdminUpdateInput } from '@pubkey-resolver/sdk'
import { UiStack } from '@pubkey-ui/core'

export function AdminAccountUiUpdateForm({
  submit,
  account,
}: {
  submit: (res: AccountAdminUpdateInput) => Promise<boolean>
  account: Account
}) {
  const form = useForm<AccountAdminUpdateInput>({
    initialValues: {
      label: account.label ?? '',
    },
  })

  return (
    <form onSubmit={form.onSubmit((values) => submit(values))}>
      <UiStack>
        <TextInput name="label" label="label" {...form.getInputProps('label')} />

        <Group justify="right">
          <Button type="submit">Save</Button>
        </Group>
      </UiStack>
    </form>
  )
}
