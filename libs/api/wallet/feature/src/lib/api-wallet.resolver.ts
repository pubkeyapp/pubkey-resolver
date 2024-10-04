import { Resolver } from '@nestjs/graphql'
import { ApiWalletService } from '@pubkey-resolver/api-wallet-data-access'
import { Wallet } from '@pubkey-resolver/api-wallet-data-access'

@Resolver(() => Wallet)
export class ApiWalletResolver {
  constructor(private readonly service: ApiWalletService) {}
}
