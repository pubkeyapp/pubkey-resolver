import { Box, Button } from '@mantine/core'
import { Index } from '@pubkey-resolver/sdk'
import { useAdminResolveWallet } from '@pubkey-resolver/web-index-data-access'
import { toastError, toastSuccess } from '@pubkey-ui/core'

export function IndexWalletButton({
  index,
  refresh,
  walletId,
}: {
  index: Index
  refresh: () => void
  walletId: string
}) {
  const mutation = useAdminResolveWallet({ address: index.address, cluster: index.cluster })

  return (
    <Box key={index.id}>
      <Button
        loading={mutation.isPending}
        onClick={() => {
          mutation
            .mutateAsync(walletId)
            .then(() => {
              toastSuccess(`Wallet ${walletId} resolved for index ${index.label}`)
              refresh()
            })
            .catch((err) => {
              toastError(err.message)
              refresh()
            })
        }}
      >
        Index {index.label}
      </Button>
    </Box>
  )
}
