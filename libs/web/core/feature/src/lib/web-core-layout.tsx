import { Group } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { useAuth } from '@pubkey-resolver/web-auth-data-access'
import { UiHeaderProfile } from '@pubkey-resolver/web-core-ui'

import { UiHeader, UiLayout, UiLoader } from '@pubkey-ui/core'
import { ReactNode, Suspense } from 'react'

export function WebCoreLayout({ children }: { children: ReactNode }) {
  const { user, logout } = useAuth()
  const [opened, { toggle }] = useDisclosure(false)
  return (
    <UiLayout
      header={
        <UiHeader
          opened={opened}
          toggle={toggle}
          links={[
            { link: '/dashboard', label: 'Dashboard' },
            { link: '/indexes', label: 'Indexes' },
          ]}
          profile={
            <Group gap="xs">
              <UiHeaderProfile user={user} logout={logout} />
            </Group>
          }
        />
      }
    >
      <Suspense fallback={<UiLoader mt="xl" size="xl" type="dots" />}>{children}</Suspense>
    </UiLayout>
  )
}
