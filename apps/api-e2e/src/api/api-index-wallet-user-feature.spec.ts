import {
  IndexWalletUserCreateInput,
  IndexWalletUserFindManyInput,
  IndexWalletUserUpdateInput,
  IndexWallet,
} from '@pubkey-resolver/sdk'
import { getAliceCookie, getBobCookie, sdk, uniqueId } from '../support'

describe('api-index-wallet-feature', () => {
  describe('api-index-wallet-user-resolver', () => {
    const indexWalletName = uniqueId('acme-index-wallet')

    let indexWalletId: string
    let cookie: string

    beforeAll(async () => {
      cookie = await getAliceCookie()
      const created = await sdk.userCreateIndexWallet({ input: { name: indexWalletName } }, { cookie })
      indexWalletId = created.data.created.id
    })

    describe('authorized', () => {
      beforeAll(async () => {
        cookie = await getAliceCookie()
      })

      it('should create a index-wallet', async () => {
        const input: IndexWalletUserCreateInput = {
          name: uniqueId('index-wallet'),
        }

        const res = await sdk.userCreateIndexWallet({ input }, { cookie })

        const item: IndexWallet = res.data.created
        expect(item.name).toBe(input.name)
        expect(item.id).toBeDefined()
        expect(item.createdAt).toBeDefined()
        expect(item.updatedAt).toBeDefined()
      })

      it('should update a index-wallet', async () => {
        const createInput: IndexWalletUserCreateInput = {
          name: uniqueId('index-wallet'),
        }
        const createdRes = await sdk.userCreateIndexWallet({ input: createInput }, { cookie })
        const indexWalletId = createdRes.data.created.id
        const input: IndexWalletUserUpdateInput = {
          name: uniqueId('index-wallet'),
        }

        const res = await sdk.userUpdateIndexWallet({ indexWalletId, input }, { cookie })

        const item: IndexWallet = res.data.updated
        expect(item.name).toBe(input.name)
      })

      it('should find a list of indexWallets (find all)', async () => {
        const createInput: IndexWalletUserCreateInput = {
          name: uniqueId('index-wallet'),
        }
        const createdRes = await sdk.userCreateIndexWallet({ input: createInput }, { cookie })
        const indexWalletId = createdRes.data.created.id

        const input: IndexWalletUserFindManyInput = {}

        const res = await sdk.userFindManyIndexWallet({ input }, { cookie })

        expect(res.data.paging.meta.totalCount).toBeGreaterThan(1)
        expect(res.data.paging.data.length).toBeGreaterThan(1)
        // First item should be the one we created above
        expect(res.data.paging.data[0].id).toBe(indexWalletId)
      })

      it('should find a list of indexWallets (find new one)', async () => {
        const createInput: IndexWalletUserCreateInput = {
          name: uniqueId('index-wallet'),
        }
        const createdRes = await sdk.userCreateIndexWallet({ input: createInput }, { cookie })
        const indexWalletId = createdRes.data.created.id

        const input: IndexWalletUserFindManyInput = {
          search: indexWalletId,
        }

        const res = await sdk.userFindManyIndexWallet({ input }, { cookie })

        expect(res.data.paging.meta.totalCount).toBe(1)
        expect(res.data.paging.data.length).toBe(1)
        expect(res.data.paging.data[0].id).toBe(indexWalletId)
      })

      it('should find a index-wallet by id', async () => {
        const createInput: IndexWalletUserCreateInput = {
          name: uniqueId('index-wallet'),
        }
        const createdRes = await sdk.userCreateIndexWallet({ input: createInput }, { cookie })
        const indexWalletId = createdRes.data.created.id

        const res = await sdk.userFindOneIndexWallet({ indexWalletId }, { cookie })

        expect(res.data.item.id).toBe(indexWalletId)
      })

      it('should delete a index-wallet', async () => {
        const createInput: IndexWalletUserCreateInput = {
          name: uniqueId('index-wallet'),
        }
        const createdRes = await sdk.userCreateIndexWallet({ input: createInput }, { cookie })
        const indexWalletId = createdRes.data.created.id

        const res = await sdk.userDeleteIndexWallet({ indexWalletId }, { cookie })

        expect(res.data.deleted).toBe(true)

        const findRes = await sdk.userFindManyIndexWallet({ input: { search: indexWalletId } }, { cookie })
        expect(findRes.data.paging.meta.totalCount).toBe(0)
        expect(findRes.data.paging.data.length).toBe(0)
      })
    })

    describe('unauthorized', () => {
      let cookie: string
      beforeAll(async () => {
        cookie = await getBobCookie()
      })

      it('should not update a index-wallet', async () => {
        expect.assertions(1)
        try {
          await sdk.userUpdateIndexWallet({ indexWalletId, input: {} }, { cookie })
        } catch (e) {
          expect(e.message).toBe('You are not authorized to update this IndexWallet')
        }
      })

      it('should not find a index-wallet by id', async () => {
        expect.assertions(1)
        try {
          await sdk.userFindOneIndexWallet({ indexWalletId }, { cookie })
        } catch (e) {
          expect(e.message).toBe('You are not authorized to view this IndexWallet')
        }
      })

      it('should not delete a index-wallet', async () => {
        expect.assertions(1)
        try {
          await sdk.userDeleteIndexWallet({ indexWalletId }, { cookie })
        } catch (e) {
          expect(e.message).toBe('You are not authorized to delete this IndexWallet')
        }
      })
    })
  })
})
