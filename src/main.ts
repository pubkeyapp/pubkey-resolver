import { walletNameToAddressAndProfilePicture } from '@portal-payments/solana-wallet-names'
import express from 'express'
import { Connection } from '@solana/web3.js'
import { LRUCache } from 'lru-cache'

const host = process.env.HOST ?? 'localhost'
const port = process.env.PORT ? Number(process.env.PORT) : 3000
const endpoint = process.env.SOLANA_RPC ?? 'https://api.mainnet-beta.solana.com'
const app = express()

const connection = new Connection(endpoint, 'confirmed')
interface WalletAddressAndProfilePicture {
  walletAddress: string | null
  profilePicture: string | null
}
const cache = new LRUCache<string, WalletAddressAndProfilePicture>({
  max: 100,
  ttl: 1000 * 60 * 60,
})

app.get('/', (req, res) => {
  res.send(':)')
})

app.get('/domain/:name', async (req, res) => {
  if (!req.params.name.includes('.')) {
    return res.status(400).send({ message: 'Invalid domain name' })
  }
  const name = req.params.name

  const cached = cache.get(name)
  if (cached) {
    console.log(`[ cache hit ] ${name} ${cached.walletAddress}`)
    return res.send(cached)
  }

  const result = await walletNameToAddressAndProfilePicture(connection, name)
  if (!result) {
    return res.status(400).send({ message: 'Could not find domain' })
  }

  console.log(`[ cache miss ] ${name} ${result.walletAddress}`)
  cache.set(name, result)
  res.send(result)
})

app.listen(port, host, () => {
  console.log(`[ ready ] http://${host}:${port}`)
  console.log(`[ ready ] /domain/:name`)
})
