import {
  IndexEntryAdminCreateInput,
  IndexEntryAdminFindManyInput,
  IndexEntryAdminUpdateInput,
  IndexEntry,
} from '@pubkey-resolver/sdk'
import { getAliceCookie, getBobCookie, sdk, uniqueId } from '../support'

describe('api-index-entry-feature', () => {
  describe('api-index-entry-admin-resolver', () => {
    const indexEntryName = uniqueId('acme-index-entry')

    let indexEntryId: string
    let cookie: string

    beforeAll(async () => {
      cookie = await getAliceCookie()
      const created = await sdk.adminCreateIndexEntry({ input: { name: indexEntryName } }, { cookie })
      indexEntryId = created.data.created.id
    })

    describe('authorized', () => {
      beforeAll(async () => {
        cookie = await getAliceCookie()
      })

      it('should create a index-entry', async () => {
        const input: IndexEntryAdminCreateInput = {
          name: uniqueId('index-entry'),
        }

        const res = await sdk.adminCreateIndexEntry({ input }, { cookie })

        const item: IndexEntry = res.data.created
        expect(item.name).toBe(input.name)
        expect(item.id).toBeDefined()
        expect(item.createdAt).toBeDefined()
        expect(item.updatedAt).toBeDefined()
      })

      it('should update a index-entry', async () => {
        const createInput: IndexEntryAdminCreateInput = {
          name: uniqueId('index-entry'),
        }
        const createdRes = await sdk.adminCreateIndexEntry({ input: createInput }, { cookie })
        const indexEntryId = createdRes.data.created.id
        const input: IndexEntryAdminUpdateInput = {
          name: uniqueId('index-entry'),
        }

        const res = await sdk.adminUpdateIndexEntry({ indexEntryId, input }, { cookie })

        const item: IndexEntry = res.data.updated
        expect(item.name).toBe(input.name)
      })

      it('should find a list of indexEntries (find all)', async () => {
        const createInput: IndexEntryAdminCreateInput = {
          name: uniqueId('index-entry'),
        }
        const createdRes = await sdk.adminCreateIndexEntry({ input: createInput }, { cookie })
        const indexEntryId = createdRes.data.created.id

        const input: IndexEntryAdminFindManyInput = {}

        const res = await sdk.adminFindManyIndexEntry({ input }, { cookie })

        expect(res.data.paging.meta.totalCount).toBeGreaterThan(1)
        expect(res.data.paging.data.length).toBeGreaterThan(1)
        // First item should be the one we created above
        expect(res.data.paging.data[0].id).toBe(indexEntryId)
      })

      it('should find a list of indexEntries (find new one)', async () => {
        const createInput: IndexEntryAdminCreateInput = {
          name: uniqueId('index-entry'),
        }
        const createdRes = await sdk.adminCreateIndexEntry({ input: createInput }, { cookie })
        const indexEntryId = createdRes.data.created.id

        const input: IndexEntryAdminFindManyInput = {
          search: indexEntryId,
        }

        const res = await sdk.adminFindManyIndexEntry({ input }, { cookie })

        expect(res.data.paging.meta.totalCount).toBe(1)
        expect(res.data.paging.data.length).toBe(1)
        expect(res.data.paging.data[0].id).toBe(indexEntryId)
      })

      it('should find a index-entry by id', async () => {
        const createInput: IndexEntryAdminCreateInput = {
          name: uniqueId('index-entry'),
        }
        const createdRes = await sdk.adminCreateIndexEntry({ input: createInput }, { cookie })
        const indexEntryId = createdRes.data.created.id

        const res = await sdk.adminFindOneIndexEntry({ indexEntryId }, { cookie })

        expect(res.data.item.id).toBe(indexEntryId)
      })

      it('should delete a index-entry', async () => {
        const createInput: IndexEntryAdminCreateInput = {
          name: uniqueId('index-entry'),
        }
        const createdRes = await sdk.adminCreateIndexEntry({ input: createInput }, { cookie })
        const indexEntryId = createdRes.data.created.id

        const res = await sdk.adminDeleteIndexEntry({ indexEntryId }, { cookie })

        expect(res.data.deleted).toBe(true)

        const findRes = await sdk.adminFindManyIndexEntry({ input: { search: indexEntryId } }, { cookie })
        expect(findRes.data.paging.meta.totalCount).toBe(0)
        expect(findRes.data.paging.data.length).toBe(0)
      })
    })

    describe('unauthorized', () => {
      let cookie: string
      beforeAll(async () => {
        cookie = await getBobCookie()
      })

      it('should not update a index-entry', async () => {
        expect.assertions(1)
        try {
          await sdk.adminUpdateIndexEntry({ indexEntryId, input: {} }, { cookie })
        } catch (e) {
          expect(e.message).toBe('Unauthorized: User is not Admin')
        }
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
