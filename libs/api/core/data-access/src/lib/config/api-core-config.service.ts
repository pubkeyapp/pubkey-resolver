import { Injectable, Logger } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { IdentityProvider, NetworkCluster } from '@prisma/client'
import { CookieOptions } from 'express-serve-static-core'
import { AppConfig } from '../entity/app-config.entity'
import { ApiCoreConfig } from './configuration'

@Injectable()
export class ApiCoreConfigService {
  private readonly logger = new Logger(ApiCoreConfigService.name)
  constructor(private readonly service: ConfigService<ApiCoreConfig>) {
    if (this.authRegisterEnabled && !this.authPasswordEnabled) {
      throw new Error('Configuration error: Cannot enable AUTH_REGISTER_ENABLED without enabling AUTH_PASSWORD_ENABLED')
    }
  }

  get appConfig(): AppConfig {
    return {
      authGithubEnabled: this.authGithubEnabled,
      authPasswordEnabled: this.authPasswordEnabled,
      authRegisterEnabled: this.authRegisterEnabled,
    }
  }

  get authGithubAdminIds() {
    return this.service.get<string[]>('authGithubAdminIds')
  }

  get authGithubClientId() {
    return this.service.get<string>('authGithubClientId')
  }

  get authGithubClientSecret() {
    return this.service.get<string>('authGithubClientSecret')
  }

  get authGithubScope(): string[] {
    return ['public_profile']
  }

  get authGithubStrategyOptions() {
    return {
      clientID: this.authGithubClientId,
      clientSecret: this.authGithubClientSecret,
      callbackURL: this.webUrl + '/api/auth/github/callback',
      scope: this.authGithubScope,
      passReqToCallback: true,
    }
  }

  get authGithubEnabled(): boolean {
    return !(
      !this.authGithubClientId ||
      !this.authGithubClientSecret ||
      !this.service.get<boolean>('authGithubEnabled')
    )
  }

  get authPasswordEnabled(): boolean {
    return this.service.get<boolean>('authPasswordEnabled') ?? false
  }

  get authRegisterEnabled(): boolean {
    return this.service.get<boolean>('authRegisterEnabled') ?? false
  }

  get apiUrl(): string {
    return this.service.get<string>('apiUrl') as string
  }

  get cookieDomains(): string[] {
    return this.service.get<string[]>('cookieDomains') ?? []
  }

  get cookieName(): string {
    return this.service.get('cookieName') as string
  }

  cookieOptions(hostname: string): CookieOptions {
    const found = this.cookieDomains.find((domain) => hostname.endsWith(domain))
    if (!found) {
      this.logger.warn(
        `Not configured to set cookies for ${hostname}. cookieDomains: ${
          this.cookieDomains.length ? this.cookieDomains.join(', ') : 'not configured'
        }`,
      )
    }
    const isSecure = this.cookieSecure ?? this.apiUrl.startsWith('https')
    return {
      httpOnly: true,
      secure: true,
      domain: found || this.cookieDomains[0],
      sameSite: isSecure ? 'none' : 'strict',
    } as CookieOptions
  }

  get cookieSecure(): boolean {
    return this.service.get('cookieSecure') as boolean
  }

  get databaseProvision() {
    return this.service.get<boolean>('databaseProvision')
  }

  get environment() {
    return this.service.get('environment')
  }

  get heliusApiKey() {
    return this.service.get('heliusApiKey')
  }

  get host() {
    return this.service.get<string>('host')
  }

  get isDevelopment(): boolean {
    return this.environment === 'development'
  }

  get jwtSecret() {
    return this.service.get<string>('jwtSecret') as string
  }

  get networkClusters(): Record<NetworkCluster, string> {
    const clusterMap: { cluster: NetworkCluster; endpoint: string | undefined }[] = [
      { cluster: NetworkCluster.SolanaCustom, endpoint: this.service.get<string>('networkClusterSolanaCustom') },
      { cluster: NetworkCluster.SolanaDevnet, endpoint: this.service.get<string>('networkClusterSolanaDevnet') },
      { cluster: NetworkCluster.SolanaMainnet, endpoint: this.service.get<string>('networkClusterSolanaMainnet') },
      { cluster: NetworkCluster.SolanaTestnet, endpoint: this.service.get<string>('networkClusterSolanaTestnet') },
    ]

    return clusterMap.reduce((acc, key) => {
      return key.endpoint ? { ...acc, [key.cluster]: key.endpoint } : acc
    }, {} as Record<NetworkCluster, string>)
  }

  get port() {
    return this.service.get<number>('port')
  }

  get prefix() {
    return '/api'
  }

  get sessionSecret() {
    return this.service.get<string>('sessionSecret') as string
  }

  get webUrl(): string {
    return this.service.get<string>('webUrl') as string
  }

  isAdminId(provider: IdentityProvider, providerId: string) {
    switch (provider) {
      case IdentityProvider.GitHub:
        return this.authGithubAdminIds?.includes(providerId) ?? false
      default:
        return false
    }
  }
}

export type NetworkClusterMap = Record<NetworkCluster, string>
