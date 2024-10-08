import { Button, Container, Group, Text, Title } from '@mantine/core'
import { UiStack } from '@pubkey-ui/core'
import { IconHome } from '@tabler/icons-react'
import { Link } from 'react-router-dom'

export default function AboutPage() {
  return (
    <Container size={800}>
      <UiStack gap="xl" py="xl">
        <Title>About PubKey Resolver.</Title>
        <Text c="dimmed">This is an empty about page.</Text>
        <Group>
          <Button component={Link} to="/home" size="xl" color="brand" leftSection={<IconHome />}>
            Back to Home
          </Button>
        </Group>
      </UiStack>
    </Container>
  )
}
