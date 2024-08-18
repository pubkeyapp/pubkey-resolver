import { IndexType, IndexUserFindManyInput, NetworkCluster } from '@pubkey-resolver/sdk'
import { Keypair } from '@solana/web3.js'
import { getAliceCookie, sdk } from '../support'

xdescribe('api-index-feature', () => {
  describe('api-index-user-resolver', () => {
    const cluster = NetworkCluster.SolanaCustom
    let indexId: string
    let cookie: string

    beforeAll(async () => {
      cookie = await getAliceCookie()
      const keypair = Keypair.generate()
      const indexAddress = keypair.publicKey.toBase58()
      const created = await sdk.adminCreateIndex(
        {
          input: {
            type: IndexType.SolanaMint,
            address: indexAddress,
            cluster,
          },
        },
        { cookie },
      )
      indexId = created.data.created.id
    })

    describe('authorized', () => {
      beforeAll(async () => {
        cookie = await getAliceCookie()
      })

      it('should find a list of indexes (find all)', async () => {
        const input: IndexUserFindManyInput = {
          limit: 1000,
        }

        const res = await sdk.userFindManyIndex({ input }, { cookie })

        expect(res.data.paging.meta.totalCount).toBeGreaterThan(1)
        expect(res.data.paging.data.length).toBeGreaterThan(1)
        // First item should be the one we created above
        expect(res.data.paging.data.map((i) => i.id)).toContain(indexId)
      })

      it('should find a index by id', async () => {
        const res = await sdk.userFindOneIndex({ indexId }, { cookie })

        expect(res.data.item.id).toBe(indexId)
      })
    })
  })
})
