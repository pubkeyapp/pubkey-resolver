import { Button, Group, TextInput } from '@mantine/core'
import { useForm } from '@mantine/form'
import { Wallet, WalletUserUpdateInput } from '@pubkey-resolver/sdk'
import { UiStack } from '@pubkey-ui/core'

export function UserWalletUiUpdateForm({
  submit,
  wallet,
}: {
  submit: (res: WalletUserUpdateInput) => Promise<boolean>
  wallet: Wallet
}) {
  const form = useForm<WalletUserUpdateInput>({
    initialValues: {
      label: wallet.label ?? '',
    },
  })

  return (
    <form onSubmit={form.onSubmit((values) => submit(values))}>
      <UiStack>
        <TextInput label="label" name="label" {...form.getInputProps('label')} />
        <Group justify="right">
          <Button type="submit">Save</Button>
        </Group>
      </UiStack>
    </form>
  )
}
