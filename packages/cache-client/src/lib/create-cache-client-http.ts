import { createStorage } from 'unstorage'
import httpDriver, { HTTPOptions } from 'unstorage/drivers/http'

export function createCacheClientHttp(options: HTTPOptions) {
  return createStorage({
    driver: httpDriver(options),
  })
}
