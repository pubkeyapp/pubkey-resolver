import { IndexEntryUserFindManyInput, IndexType, NetworkCluster } from '@pubkey-resolver/sdk'
import { Keypair } from '@solana/web3.js'
import { getAliceCookie, getBobCookie, sdk } from '../support'

xdescribe('api-index-entry-feature', () => {
  describe('api-index-entry-user-resolver', () => {
    const cluster = NetworkCluster.SolanaCustom
    const indexAddress = new Keypair().publicKey.toBase58()
    let indexId: string
    let cookie: string

    beforeAll(async () => {
      cookie = await getAliceCookie()
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

      it('should find a list of indexEntries (find all)', async () => {
        const input: IndexEntryUserFindManyInput = {
          cluster,
          indexAddress,
        }

        const res = await sdk.userFindManyIndexEntry({ input }, { cookie })

        expect(res.data.paging.meta.totalCount).toBeGreaterThan(1)
        expect(res.data.paging.data.length).toBeGreaterThan(1)
        // First item should be the one we created above
        expect(res.data.paging.data).toBeDefined()
      })
    })

    describe('unauthorized', () => {
      let cookie: string
      beforeAll(async () => {
        cookie = await getBobCookie()
      })
    })
  })
})
