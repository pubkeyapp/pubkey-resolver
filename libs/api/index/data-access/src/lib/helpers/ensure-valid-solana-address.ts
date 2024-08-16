import { PublicKey } from '@solana/web3.js'

export function ensureValidSolanaAddress(address: string) {
  try {
    new PublicKey(address)
  } catch (error) {
    throw new Error(`Invalid Solana public key.`)
  }
}
