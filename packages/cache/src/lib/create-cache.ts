import * as process from 'node:process'
import { createStorage } from 'unstorage'
import fsDriver, { FSStorageOptions } from 'unstorage/drivers/fs-lite'

export type Cache = ReturnType<typeof createCache>

export function createCache(options: FSStorageOptions) {
  const base = options.base?.startsWith('/') ? options.base : process.cwd() + '/' + options.base
  return createStorage({
    driver: fsDriver({ ...options, base }),
  })
}
