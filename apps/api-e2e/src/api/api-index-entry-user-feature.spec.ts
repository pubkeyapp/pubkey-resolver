import {
  IndexEntryUserCreateInput,
  IndexEntryUserFindManyInput,
  IndexEntryUserUpdateInput,
  IndexEntry,
} from '@pubkey-resolver/sdk'
import { getAliceCookie, getBobCookie, sdk, uniqueId } from '../support'

describe('api-index-entry-feature', () => {
  describe('api-index-entry-user-resolver', () => {
    const indexEntryName = uniqueId('acme-index-entry')

    let indexEntryId: string
    let cookie: string

    beforeAll(async () => {
      cookie = await getAliceCookie()
      const created = await sdk.userCreateIndexEntry({ input: { name: indexEntryName } }, { cookie })
      indexEntryId = created.data.created.id
    })

    describe('authorized', () => {
      beforeAll(async () => {
        cookie = await getAliceCookie()
      })

      it('should create a index-entry', async () => {
        const input: IndexEntryUserCreateInput = {
          name: uniqueId('index-entry'),
        }

        const res = await sdk.userCreateIndexEntry({ input }, { cookie })

        const item: IndexEntry = res.data.created
        expect(item.name).toBe(input.name)
        expect(item.id).toBeDefined()
        expect(item.createdAt).toBeDefined()
        expect(item.updatedAt).toBeDefined()
      })

      it('should update a index-entry', async () => {
        const createInput: IndexEntryUserCreateInput = {
          name: uniqueId('index-entry'),
        }
        const createdRes = await sdk.userCreateIndexEntry({ input: createInput }, { cookie })
        const indexEntryId = createdRes.data.created.id
        const input: IndexEntryUserUpdateInput = {
          name: uniqueId('index-entry'),
        }

        const res = await sdk.userUpdateIndexEntry({ indexEntryId, input }, { cookie })

        const item: IndexEntry = res.data.updated
        expect(item.name).toBe(input.name)
      })

      it('should find a list of indexEntries (find all)', async () => {
        const createInput: IndexEntryUserCreateInput = {
          name: uniqueId('index-entry'),
        }
        const createdRes = await sdk.userCreateIndexEntry({ input: createInput }, { cookie })
        const indexEntryId = createdRes.data.created.id

        const input: IndexEntryUserFindManyInput = {}

        const res = await sdk.userFindManyIndexEntry({ input }, { cookie })

        expect(res.data.paging.meta.totalCount).toBeGreaterThan(1)
        expect(res.data.paging.data.length).toBeGreaterThan(1)
        // First item should be the one we created above
        expect(res.data.paging.data[0].id).toBe(indexEntryId)
      })

      it('should find a list of indexEntries (find new one)', async () => {
        const createInput: IndexEntryUserCreateInput = {
          name: uniqueId('index-entry'),
        }
        const createdRes = await sdk.userCreateIndexEntry({ input: createInput }, { cookie })
        const indexEntryId = createdRes.data.created.id

        const input: IndexEntryUserFindManyInput = {
          search: indexEntryId,
        }

        const res = await sdk.userFindManyIndexEntry({ input }, { cookie })

        expect(res.data.paging.meta.totalCount).toBe(1)
        expect(res.data.paging.data.length).toBe(1)
        expect(res.data.paging.data[0].id).toBe(indexEntryId)
      })

      it('should find a index-entry by id', async () => {
        const createInput: IndexEntryUserCreateInput = {
          name: uniqueId('index-entry'),
        }
        const createdRes = await sdk.userCreateIndexEntry({ input: createInput }, { cookie })
        const indexEntryId = createdRes.data.created.id

        const res = await sdk.userFindOneIndexEntry({ indexEntryId }, { cookie })

        expect(res.data.item.id).toBe(indexEntryId)
      })

      it('should delete a index-entry', async () => {
        const createInput: IndexEntryUserCreateInput = {
          name: uniqueId('index-entry'),
        }
        const createdRes = await sdk.userCreateIndexEntry({ input: createInput }, { cookie })
        const indexEntryId = createdRes.data.created.id

        const res = await sdk.userDeleteIndexEntry({ indexEntryId }, { cookie })

        expect(res.data.deleted).toBe(true)

        const findRes = await sdk.userFindManyIndexEntry({ input: { search: indexEntryId } }, { cookie })
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
          await sdk.userUpdateIndexEntry({ indexEntryId, input: {} }, { cookie })
        } catch (e) {
          expect(e.message).toBe('You are not authorized to update this IndexEntry')
        }
      })

      it('should not find a index-entry by id', async () => {
        expect.assertions(1)
        try {
          await sdk.userFindOneIndexEntry({ indexEntryId }, { cookie })
        } catch (e) {
          expect(e.message).toBe('You are not authorized to view this IndexEntry')
        }
      })

      it('should not delete a index-entry', async () => {
        expect.assertions(1)
        try {
          await sdk.userDeleteIndexEntry({ indexEntryId }, { cookie })
        } catch (e) {
          expect(e.message).toBe('You are not authorized to delete this IndexEntry')
        }
      })
    })
  })
})
