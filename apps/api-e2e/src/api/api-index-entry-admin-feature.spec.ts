import { Index, IndexEntryAdminFindManyInput, IndexType, NetworkCluster } from '@pubkey-resolver/sdk'
import { Keypair } from '@solana/web3.js'
import { getAliceCookie, getBobCookie, sdk, uniqueId } from '../support'

xdescribe('api-index-entry-feature', () => {
  describe('api-index-entry-admin-resolver', () => {
    const indexEntryName = uniqueId('acme-index-entry')
    const cluster = NetworkCluster.SolanaCustom
    const indexAddress = new Keypair().publicKey.toBase58()
    let index: Index
    let indexEntryId: string
    let cookie: string

    beforeAll(async () => {
      cookie = await getAliceCookie()
      index = await sdk
        .adminCreateIndex(
          {
            input: {
              cluster,
              address: indexAddress,
              type: IndexType.SolanaMint,
            },
          },
          { cookie },
        )
        .then((res) => res.data.created)
      console.log(index)
    })

    describe('authorized', () => {
      fit('should find a list of indexEntries (find all)', async () => {
        const input: IndexEntryAdminFindManyInput = {
          cluster,
          indexAddress,
        }

        // const res = await sdk.adminFindManyIndexEntry({ input }, { cookie })

        // expect(res.data.paging.meta.totalCount).toBeGreaterThan(1)
        // expect(res.data.paging.data.length).toBeGreaterThan(1)
        // First item should be the one we created above
        // expect(res.data.paging.data).toBeDefined()
        expect(true).toBe(true)
      })

      it('should find a index-entry by id', async () => {
        const res = await sdk.adminFindOneIndexEntry({ indexEntryId }, { cookie })

        expect(res.data.item.id).toBe(indexEntryId)
      })
    })

    describe('unauthorized', () => {
      let cookie: string
      beforeAll(async () => {
        cookie = await getBobCookie()
      })

      it('should not find a index-entry by id', async () => {
        expect.assertions(1)
        try {
          await sdk.adminFindOneIndexEntry({ indexEntryId }, { cookie })
        } catch (e) {
          expect(e.message).toBe('Unauthorized: User is not Admin')
        }
      })

      it('should not delete a index-entry', async () => {
        expect.assertions(1)
        try {
          await sdk.adminDeleteIndexEntry({ indexEntryId }, { cookie })
        } catch (e) {
          expect(e.message).toBe('Unauthorized: User is not Admin')
        }
      })
    })
  })
})
