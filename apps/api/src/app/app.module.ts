import { Module } from '@nestjs/common'
import { ApiCoreFeatureModule } from '@pubkey-resolver/api-core-feature'

@Module({
  imports: [ApiCoreFeatureModule],
})
export class AppModule {}
