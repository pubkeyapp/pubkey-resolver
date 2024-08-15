import { createCache } from './create-cache'

describe('createCache', () => {
  it('should work', () => {
    const cache = createCache({ base: './tmp/cache' })

    expect(cache).toBeDefined()
  })
})
