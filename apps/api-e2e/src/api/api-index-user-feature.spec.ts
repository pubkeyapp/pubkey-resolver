import { Index, IndexUserCreateInput, IndexUserFindManyInput, IndexUserUpdateInput } from '@pubkey-resolver/sdk'
import { getAliceCookie, getBobCookie, sdk, uniqueId } from '../support'

describe('api-index-feature', () => {
  describe('api-index-user-resolver', () => {
    const indexName = uniqueId('acme-index')

    let indexId: string
    let cookie: string

    beforeAll(async () => {
      cookie = await getAliceCookie()
      const created = await sdk.userCreateIndex({ input: { name: indexName } }, { cookie })
      indexId = created.data.created.id
    })

    describe('authorized', () => {
      beforeAll(async () => {
        cookie = await getAliceCookie()
      })

      it('should create a index', async () => {
        const input: IndexUserCreateInput = {
          name: uniqueId('index'),
        }

        const res = await sdk.userCreateIndex({ input }, { cookie })

        const item: Index = res.data.created
        expect(item.name).toBe(input.name)
        expect(item.id).toBeDefined()
        expect(item.createdAt).toBeDefined()
        expect(item.updatedAt).toBeDefined()
      })

      it('should update a index', async () => {
        const createInput: IndexUserCreateInput = {
          name: uniqueId('index'),
        }
        const createdRes = await sdk.userCreateIndex({ input: createInput }, { cookie })
        const indexId = createdRes.data.created.id
        const input: IndexUserUpdateInput = {
          name: uniqueId('index'),
        }

        const res = await sdk.userUpdateIndex({ indexId, input }, { cookie })

        const item: Index = res.data.updated
        expect(item.name).toBe(input.name)
      })

      it('should find a list of indexes (find all)', async () => {
        const createInput: IndexUserCreateInput = {
          name: uniqueId('index'),
        }
        const createdRes = await sdk.userCreateIndex({ input: createInput }, { cookie })
        const indexId = createdRes.data.created.id

        const input: IndexUserFindManyInput = {}

        const res = await sdk.userFindManyIndex({ input }, { cookie })

        expect(res.data.paging.meta.totalCount).toBeGreaterThan(1)
        expect(res.data.paging.data.length).toBeGreaterThan(1)
        // First item should be the one we created above
        expect(res.data.paging.data[0].id).toBe(indexId)
      })

      it('should find a list of indexes (find new one)', async () => {
        const createInput: IndexUserCreateInput = {
          name: uniqueId('index'),
        }
        const createdRes = await sdk.userCreateIndex({ input: createInput }, { cookie })
        const indexId = createdRes.data.created.id

        const input: IndexUserFindManyInput = {
          search: indexId,
        }

        const res = await sdk.userFindManyIndex({ input }, { cookie })

        expect(res.data.paging.meta.totalCount).toBe(1)
        expect(res.data.paging.data.length).toBe(1)
        expect(res.data.paging.data[0].id).toBe(indexId)
      })

      it('should find a index by id', async () => {
        const createInput: IndexUserCreateInput = {
          name: uniqueId('index'),
        }
        const createdRes = await sdk.userCreateIndex({ input: createInput }, { cookie })
        const indexId = createdRes.data.created.id

        const res = await sdk.userFindOneIndex({ indexId }, { cookie })

        expect(res.data.item.id).toBe(indexId)
      })

      it('should delete a index', async () => {
        const createInput: IndexUserCreateInput = {
          name: uniqueId('index'),
        }
        const createdRes = await sdk.userCreateIndex({ input: createInput }, { cookie })
        const indexId = createdRes.data.created.id

        const res = await sdk.userDeleteIndex({ indexId }, { cookie })

        expect(res.data.deleted).toBe(true)

        const findRes = await sdk.userFindManyIndex({ input: { search: indexId } }, { cookie })
        expect(findRes.data.paging.meta.totalCount).toBe(0)
        expect(findRes.data.paging.data.length).toBe(0)
      })
    })

    describe('unauthorized', () => {
      let cookie: string
      beforeAll(async () => {
        cookie = await getBobCookie()
      })

      it('should not update a index', async () => {
        expect.assertions(1)
        try {
          await sdk.userUpdateIndex({ indexId, input: {} }, { cookie })
        } catch (e) {
          expect(e.message).toBe('You are not authorized to update this Index')
        }
      })

      it('should not find a index by id', async () => {
        expect.assertions(1)
        try {
          await sdk.userFindOneIndex({ indexId }, { cookie })
        } catch (e) {
          expect(e.message).toBe('You are not authorized to view this Index')
        }
      })

      it('should not delete a index', async () => {
        expect.assertions(1)
        try {
          await sdk.userDeleteIndex({ indexId }, { cookie })
        } catch (e) {
          expect(e.message).toBe('You are not authorized to delete this Index')
        }
      })
    })
  })
})
