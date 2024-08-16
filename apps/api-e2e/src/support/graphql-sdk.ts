import { getGraphQLSdk, Sdk } from '@pubkey-resolver/sdk'
import { getApiUrl } from './get-api.url'
import { alice, bob, TestUser } from './user-identities'

export const sdk: Sdk = getGraphQLSdk(getApiUrl('/graphql'))

async function getUserCookie(user: TestUser) {
  const res = await sdk.login({
    input: { username: user.username, password: user.password },
  })

  return res.headers.get('set-cookie')
}

export async function getAliceCookie() {
  return getUserCookie(alice)
}
export async function getBobCookie() {
  return getUserCookie(bob)
}
