import { AccountUserCreateInput, AccountUserFindManyInput, AccountUserUpdateInput, Account } from '@pubkey-resolver/sdk'
import { getAliceCookie, getBobCookie, sdk, uniqueId } from '../support'

describe('api-account-feature', () => {
  describe('api-account-user-resolver', () => {
    const accountName = uniqueId('acme-account')

    let accountId: string
    let cookie: string

    beforeAll(async () => {
      cookie = await getAliceCookie()
      const created = await sdk.userCreateAccount({ input: { name: accountName } }, { cookie })
      accountId = created.data.created.id
    })

    describe('authorized', () => {
      beforeAll(async () => {
        cookie = await getAliceCookie()
      })

      it('should create a account', async () => {
        const input: AccountUserCreateInput = {
          name: uniqueId('account'),
        }

        const res = await sdk.userCreateAccount({ input }, { cookie })

        const item: Account = res.data.created
        expect(item.name).toBe(input.name)
        expect(item.id).toBeDefined()
        expect(item.createdAt).toBeDefined()
        expect(item.updatedAt).toBeDefined()
      })

      it('should update a account', async () => {
        const createInput: AccountUserCreateInput = {
          name: uniqueId('account'),
        }
        const createdRes = await sdk.userCreateAccount({ input: createInput }, { cookie })
        const accountId = createdRes.data.created.id
        const input: AccountUserUpdateInput = {
          name: uniqueId('account'),
        }

        const res = await sdk.userUpdateAccount({ accountId, input }, { cookie })

        const item: Account = res.data.updated
        expect(item.name).toBe(input.name)
      })

      it('should find a list of accounts (find all)', async () => {
        const createInput: AccountUserCreateInput = {
          name: uniqueId('account'),
        }
        const createdRes = await sdk.userCreateAccount({ input: createInput }, { cookie })
        const accountId = createdRes.data.created.id

        const input: AccountUserFindManyInput = {}

        const res = await sdk.userFindManyAccount({ input }, { cookie })

        expect(res.data.paging.meta.totalCount).toBeGreaterThan(1)
        expect(res.data.paging.data.length).toBeGreaterThan(1)
        // First item should be the one we created above
        expect(res.data.paging.data[0].id).toBe(accountId)
      })

      it('should find a list of accounts (find new one)', async () => {
        const createInput: AccountUserCreateInput = {
          name: uniqueId('account'),
        }
        const createdRes = await sdk.userCreateAccount({ input: createInput }, { cookie })
        const accountId = createdRes.data.created.id

        const input: AccountUserFindManyInput = {
          search: accountId,
        }

        const res = await sdk.userFindManyAccount({ input }, { cookie })

        expect(res.data.paging.meta.totalCount).toBe(1)
        expect(res.data.paging.data.length).toBe(1)
        expect(res.data.paging.data[0].id).toBe(accountId)
      })

      it('should find a account by id', async () => {
        const createInput: AccountUserCreateInput = {
          name: uniqueId('account'),
        }
        const createdRes = await sdk.userCreateAccount({ input: createInput }, { cookie })
        const accountId = createdRes.data.created.id

        const res = await sdk.userFindOneAccount({ accountId }, { cookie })

        expect(res.data.item.id).toBe(accountId)
      })

      it('should delete a account', async () => {
        const createInput: AccountUserCreateInput = {
          name: uniqueId('account'),
        }
        const createdRes = await sdk.userCreateAccount({ input: createInput }, { cookie })
        const accountId = createdRes.data.created.id

        const res = await sdk.userDeleteAccount({ accountId }, { cookie })

        expect(res.data.deleted).toBe(true)

        const findRes = await sdk.userFindManyAccount({ input: { search: accountId } }, { cookie })
        expect(findRes.data.paging.meta.totalCount).toBe(0)
        expect(findRes.data.paging.data.length).toBe(0)
      })
    })

    describe('unauthorized', () => {
      let cookie: string
      beforeAll(async () => {
        cookie = await getBobCookie()
      })

      it('should not update a account', async () => {
        expect.assertions(1)
        try {
          await sdk.userUpdateAccount({ accountId, input: {} }, { cookie })
        } catch (e) {
          expect(e.message).toBe('You are not authorized to update this Account')
        }
      })

      it('should not find a account by id', async () => {
        expect.assertions(1)
        try {
          await sdk.userFindOneAccount({ accountId }, { cookie })
        } catch (e) {
          expect(e.message).toBe('You are not authorized to view this Account')
        }
      })

      it('should not delete a account', async () => {
        expect.assertions(1)
        try {
          await sdk.userDeleteAccount({ accountId }, { cookie })
        } catch (e) {
          expect(e.message).toBe('You are not authorized to delete this Account')
        }
      })
    })
  })
})
