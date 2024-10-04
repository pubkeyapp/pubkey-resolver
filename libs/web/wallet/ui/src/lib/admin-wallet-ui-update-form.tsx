import { Button, Group, TextInput } from '@mantine/core'
import { useForm } from '@mantine/form'
import { Wallet, WalletAdminUpdateInput } from '@pubkey-resolver/sdk'
import { UiStack } from '@pubkey-ui/core'

export function AdminWalletUiUpdateForm({
  submit,
  wallet,
}: {
  submit: (res: WalletAdminUpdateInput) => Promise<boolean>
  wallet: Wallet
}) {
  const form = useForm<WalletAdminUpdateInput>({
    initialValues: {
      label: wallet.label ?? '',
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
