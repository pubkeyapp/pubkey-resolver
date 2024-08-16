import { Index, IndexAdminCreateInput, IndexAdminFindManyInput, IndexAdminUpdateInput } from '@pubkey-resolver/sdk'
import { getAliceCookie, getBobCookie, sdk, uniqueId } from '../support'

describe('api-index-feature', () => {
  describe('api-index-admin-resolver', () => {
    const indexName = uniqueId('acme-index')

    let indexId: string
    let cookie: string

    beforeAll(async () => {
      cookie = await getAliceCookie()
      const created = await sdk.adminCreateIndex({ input: { name: indexName } }, { cookie })
      indexId = created.data.created.id
    })

    describe('authorized', () => {
      beforeAll(async () => {
        cookie = await getAliceCookie()
      })

      it('should create a index', async () => {
        const input: IndexAdminCreateInput = {
          name: uniqueId('index'),
        }

        const res = await sdk.adminCreateIndex({ input }, { cookie })

        const item: Index = res.data.created
        expect(item.name).toBe(input.name)
        expect(item.id).toBeDefined()
        expect(item.createdAt).toBeDefined()
        expect(item.updatedAt).toBeDefined()
      })

      it('should update a index', async () => {
        const createInput: IndexAdminCreateInput = {
          name: uniqueId('index'),
        }
        const createdRes = await sdk.adminCreateIndex({ input: createInput }, { cookie })
        const indexId = createdRes.data.created.id
        const input: IndexAdminUpdateInput = {
          name: uniqueId('index'),
        }

        const res = await sdk.adminUpdateIndex({ indexId, input }, { cookie })

        const item: Index = res.data.updated
        expect(item.name).toBe(input.name)
      })

      it('should find a list of indexes (find all)', async () => {
        const createInput: IndexAdminCreateInput = {
          name: uniqueId('index'),
        }
        const createdRes = await sdk.adminCreateIndex({ input: createInput }, { cookie })
        const indexId = createdRes.data.created.id

        const input: IndexAdminFindManyInput = {}

        const res = await sdk.adminFindManyIndex({ input }, { cookie })

        expect(res.data.paging.meta.totalCount).toBeGreaterThan(1)
        expect(res.data.paging.data.length).toBeGreaterThan(1)
        // First item should be the one we created above
        expect(res.data.paging.data[0].id).toBe(indexId)
      })

      it('should find a list of indexes (find new one)', async () => {
        const createInput: IndexAdminCreateInput = {
          name: uniqueId('index'),
        }
        const createdRes = await sdk.adminCreateIndex({ input: createInput }, { cookie })
        const indexId = createdRes.data.created.id

        const input: IndexAdminFindManyInput = {
          search: indexId,
        }

        const res = await sdk.adminFindManyIndex({ input }, { cookie })

        expect(res.data.paging.meta.totalCount).toBe(1)
        expect(res.data.paging.data.length).toBe(1)
        expect(res.data.paging.data[0].id).toBe(indexId)
      })

      it('should find a index by id', async () => {
        const createInput: IndexAdminCreateInput = {
          name: uniqueId('index'),
        }
        const createdRes = await sdk.adminCreateIndex({ input: createInput }, { cookie })
        const indexId = createdRes.data.created.id

        const res = await sdk.adminFindOneIndex({ indexId }, { cookie })

        expect(res.data.item.id).toBe(indexId)
      })

      it('should delete a index', async () => {
        const createInput: IndexAdminCreateInput = {
          name: uniqueId('index'),
        }
        const createdRes = await sdk.adminCreateIndex({ input: createInput }, { cookie })
        const indexId = createdRes.data.created.id

        const res = await sdk.adminDeleteIndex({ indexId }, { cookie })

        expect(res.data.deleted).toBe(true)

        const findRes = await sdk.adminFindManyIndex({ input: { search: indexId } }, { cookie })
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
          await sdk.adminUpdateIndex({ indexId, input: {} }, { cookie })
        } catch (e) {
          expect(e.message).toBe('Unauthorized: User is not Admin')
        }
      })

      it('should not find a index by id', async () => {
        expect.assertions(1)
        try {
          await sdk.adminFindOneIndex({ indexId }, { cookie })
        } catch (e) {
          expect(e.message).toBe('Unauthorized: User is not Admin')
        }
      })

      it('should not delete a index', async () => {
        expect.assertions(1)
        try {
          await sdk.adminDeleteIndex({ indexId }, { cookie })
        } catch (e) {
          expect(e.message).toBe('Unauthorized: User is not Admin')
        }
      })
    })
  })
})
