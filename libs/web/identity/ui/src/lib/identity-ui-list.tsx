import { ActionIcon, Code, Group, Menu, Text } from '@mantine/core'
import { ellipsify, Identity } from '@pubkey-resolver/sdk'
import { UiCard, UiDebugModal, UiGroup, UiStack } from '@pubkey-ui/core'
import { IconDotsVertical, IconTrash } from '@tabler/icons-react'
import { IdentityUiAvatar } from './identity-ui-avatar'
import { IdentityUiLink } from './identity-ui-link'

export function IdentityUiList({
  deleteIdentity,
  refresh,
  items,
}: {
  refresh?: () => void
  deleteIdentity?: (id: string) => void
  items: Identity[]
}) {
  return (
    <UiStack>
      {items?.map((item) => (
        <UiCard key={item.id}>
          <Group justify="space-between">
            <Group>
              <IdentityUiAvatar item={item} />
              <UiGroup gap="xs" align="center">
                {item.profile?.username ? (
                  <Text size="lg" display="flex">
                    {item.profile?.username}
                  </Text>
                ) : (
                  <Code>{ellipsify(item.providerId)}</Code>
                )}
              </UiGroup>
            </Group>
            <Group gap="xs">
              <UiDebugModal data={item} />
              <IdentityUiLink item={item} />
              {deleteIdentity && (
                <Menu shadow="md" width={200}>
                  <Menu.Target>
                    <ActionIcon variant="light" size="sm">
                      <IconDotsVertical size={16} />
                    </ActionIcon>
                  </Menu.Target>
                  <Menu.Dropdown>
                    <Menu.Label>Danger zone</Menu.Label>
                    <Menu.Item
                      color="red"
                      leftSection={<IconTrash size={14} />}
                      onClick={() => deleteIdentity(item.id)}
                    >
                      Remove this identity
                    </Menu.Item>
                  </Menu.Dropdown>
                </Menu>
              )}
            </Group>
          </Group>
        </UiCard>
      ))}
    </UiStack>
  )
}
