import { Button, Group, TextInput } from '@mantine/core'
import { useForm } from '@mantine/form'
import { IndexWallet, IndexWalletAdminUpdateInput } from '@pubkey-resolver/sdk'
import { UiStack } from '@pubkey-ui/core'

export function AdminIndexWalletUiUpdateForm({
  submit,
  indexWallet,
}: {
  submit: (res: IndexWalletAdminUpdateInput) => Promise<boolean>
  indexWallet: IndexWallet
}) {
  const form = useForm<IndexWalletAdminUpdateInput>({
    initialValues: {
      updatedAt: indexWallet.updatedAt?.toString() ?? '',
    },
  })

  return (
    <form onSubmit={form.onSubmit((values) => submit(values))}>
      <UiStack>
        <TextInput name="updatedAt" label="Updated at" disabled value={indexWallet.updatedAt?.toString()} />
        <Group justify="right">
          <Button type="submit">Save</Button>
        </Group>
      </UiStack>
    </form>
  )
}
