import { WebAdminCreateInput, WebAdminFindManyInput, WebAdminUpdateInput, Web } from '@pubkey-resolver/sdk'
import { getAliceCookie, getBobCookie, sdk, uniqueId } from '../support'

describe('api-web-feature', () => {
  describe('api-web-admin-resolver', () => {
    const webName = uniqueId('acme-web')

    let webId: string
    let cookie: string

    beforeAll(async () => {
      cookie = await getAliceCookie()
      const created = await sdk.adminCreateWeb({ input: { name: webName } }, { cookie })
      webId = created.data.created.id
    })

    describe('authorized', () => {
      beforeAll(async () => {
        cookie = await getAliceCookie()
      })

      it('should create a web', async () => {
        const input: WebAdminCreateInput = {
          name: uniqueId('web'),
        }

        const res = await sdk.adminCreateWeb({ input }, { cookie })

        const item: Web = res.data.created
        expect(item.name).toBe(input.name)
        expect(item.id).toBeDefined()
        expect(item.createdAt).toBeDefined()
        expect(item.updatedAt).toBeDefined()
      })

      it('should update a web', async () => {
        const createInput: WebAdminCreateInput = {
          name: uniqueId('web'),
        }
        const createdRes = await sdk.adminCreateWeb({ input: createInput }, { cookie })
        const webId = createdRes.data.created.id
        const input: WebAdminUpdateInput = {
          name: uniqueId('web'),
        }

        const res = await sdk.adminUpdateWeb({ webId, input }, { cookie })

        const item: Web = res.data.updated
        expect(item.name).toBe(input.name)
      })

      it('should find a list of webs (find all)', async () => {
        const createInput: WebAdminCreateInput = {
          name: uniqueId('web'),
        }
        const createdRes = await sdk.adminCreateWeb({ input: createInput }, { cookie })
        const webId = createdRes.data.created.id

        const input: WebAdminFindManyInput = {}

        const res = await sdk.adminFindManyWeb({ input }, { cookie })

        expect(res.data.paging.meta.totalCount).toBeGreaterThan(1)
        expect(res.data.paging.data.length).toBeGreaterThan(1)
        // First item should be the one we created above
        expect(res.data.paging.data[0].id).toBe(webId)
      })

      it('should find a list of webs (find new one)', async () => {
        const createInput: WebAdminCreateInput = {
          name: uniqueId('web'),
        }
        const createdRes = await sdk.adminCreateWeb({ input: createInput }, { cookie })
        const webId = createdRes.data.created.id

        const input: WebAdminFindManyInput = {
          search: webId,
        }

        const res = await sdk.adminFindManyWeb({ input }, { cookie })

        expect(res.data.paging.meta.totalCount).toBe(1)
        expect(res.data.paging.data.length).toBe(1)
        expect(res.data.paging.data[0].id).toBe(webId)
      })

      it('should find a web by id', async () => {
        const createInput: WebAdminCreateInput = {
          name: uniqueId('web'),
        }
        const createdRes = await sdk.adminCreateWeb({ input: createInput }, { cookie })
        const webId = createdRes.data.created.id

        const res = await sdk.adminFindOneWeb({ webId }, { cookie })

        expect(res.data.item.id).toBe(webId)
      })

      it('should delete a web', async () => {
        const createInput: WebAdminCreateInput = {
          name: uniqueId('web'),
        }
        const createdRes = await sdk.adminCreateWeb({ input: createInput }, { cookie })
        const webId = createdRes.data.created.id

        const res = await sdk.adminDeleteWeb({ webId }, { cookie })

        expect(res.data.deleted).toBe(true)

        const findRes = await sdk.adminFindManyWeb({ input: { search: webId } }, { cookie })
        expect(findRes.data.paging.meta.totalCount).toBe(0)
        expect(findRes.data.paging.data.length).toBe(0)
      })
    })

    describe('unauthorized', () => {
      let cookie: string
      beforeAll(async () => {
        cookie = await getBobCookie()
      })

      it('should not update a web', async () => {
        expect.assertions(1)
        try {
          await sdk.adminUpdateWeb({ webId, input: {} }, { cookie })
        } catch (e) {
          expect(e.message).toBe('Unauthorized: User is not Admin')
        }
      })

      it('should not find a web by id', async () => {
        expect.assertions(1)
        try {
          await sdk.adminFindOneWeb({ webId }, { cookie })
        } catch (e) {
          expect(e.message).toBe('Unauthorized: User is not Admin')
        }
      })

      it('should not delete a web', async () => {
        expect.assertions(1)
        try {
          await sdk.adminDeleteWeb({ webId }, { cookie })
        } catch (e) {
          expect(e.message).toBe('Unauthorized: User is not Admin')
        }
      })
    })
  })
})
