import { Connection } from '@solana/web3.js'

export function resolvers(): string {
  return 'resolvers'
}

export enum ResolverType {
  SolanaFungible = 'SolanaFungible',
  SolanaNonFungible = 'SolanaNonFungible',
}

export interface ResolveGenericOptions {
  connection: Connection
  address: string
}

export interface ResolveFungibleOptions extends ResolveGenericOptions {
  mint: string
}
export interface ResolveNonFungibleOptions extends ResolveGenericOptions {
  groups: string[]
}

export type ResolveOptions = { type: ResolverType } & (ResolveFungibleOptions | ResolveNonFungibleOptions)

export async function resolve({ type, ...options }: ResolveOptions) {
  switch (type) {
    case ResolverType.SolanaFungible:
      return resolveFungible(options as ResolveFungibleOptions)
    case ResolverType.SolanaNonFungible:
      return resolveNonFungible(options as ResolveNonFungibleOptions)
    default:
      throw new Error(`Unknown resolver type: ${type}`)
  }
}

export async function resolveFungible({ connection, address, mint }: ResolveFungibleOptions) {
  // TODO: Implement
}

export async function resolveNonFungible({ connection, address, groups }: ResolveNonFungibleOptions) {
  // TODO: Implement
}
