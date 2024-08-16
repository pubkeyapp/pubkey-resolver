import { Module } from '@nestjs/common'
import { ApiAuthDataAccessModule } from '@pubkey-resolver/api-auth-data-access'
import { ApiAuthStrategyGithubController } from './api-auth-strategy-github.controller'
import { ApiAuthController } from './api-auth.controller'
import { ApiAuthResolver } from './api-auth.resolver'

@Module({
  controllers: [ApiAuthController, ApiAuthStrategyGithubController],
  imports: [ApiAuthDataAccessModule],
  providers: [ApiAuthResolver],
})
export class ApiAuthFeatureModule {}
