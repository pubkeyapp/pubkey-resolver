import { Resolver } from '@nestjs/graphql'
import { ApiIndexWalletService } from '@pubkey-resolver/api-index-wallet-data-access'
import { IndexWallet } from '@pubkey-resolver/api-index-wallet-data-access'

@Resolver(() => IndexWallet)
export class ApiIndexWalletResolver {
  constructor(private readonly service: ApiIndexWalletService) {}
}
