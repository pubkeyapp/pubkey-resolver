import { createCacheClientHttp } from './create-cache-client-http'

describe('createCacheClientHttp', () => {
  it('should create a createCache client', () => {
    const client = createCacheClientHttp({
      base: 'http://localhost:3000',
    })
    expect(client).toBeDefined()
  })
})
