import { Button, Group, TextInput } from '@mantine/core'
import { useForm } from '@mantine/form'
import { Index, IndexAdminUpdateInput } from '@pubkey-resolver/sdk'
import { UiStack } from '@pubkey-ui/core'

export function AdminIndexUiUpdateForm({
  submit,
  index,
}: {
  submit: (res: IndexAdminUpdateInput) => Promise<boolean>
  index: Index
}) {
  const form = useForm<IndexAdminUpdateInput>({
    initialValues: {
      label: index.label ?? '',
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
