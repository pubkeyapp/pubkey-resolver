import { type DynamicModule, Module } from '@nestjs/common'

import { ApiAuthStrategyGithubModule } from './oauth/api-auth-strategy-github.module'

@Module({})
export class ApiAuthStrategyModule {
  static register(): DynamicModule {
    return {
      module: ApiAuthStrategyModule,
      imports: [ApiAuthStrategyGithubModule.register()],
    }
  }
}
