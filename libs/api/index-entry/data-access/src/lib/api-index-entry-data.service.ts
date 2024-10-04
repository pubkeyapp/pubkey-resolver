import { Injectable, Logger } from '@nestjs/common'
import { Index, IndexEntry, Prisma } from '@prisma/client'
import { ApiCoreService, PagingInputFields, SolanaAccountInfo } from '@pubkey-resolver/api-core-data-access'
import { PublicKey } from '@solana/web3.js'

import hash from 'object-hash'
import { IndexEntryPaging } from './entity/index-entry.entity'

@Injectable()
export class ApiIndexEntryDataService {
  private readonly logger = new Logger(ApiIndexEntryDataService.name)
  constructor(private readonly core: ApiCoreService) {}

  async create(input: Prisma.IndexEntryUncheckedCreateInput) {
    return this.core.data.indexEntry.create({ data: input })
  }

  async delete(indexEntryId: string) {
    await this.findOne(indexEntryId)
    const deleted = await this.core.data.indexEntry.delete({ where: { id: indexEntryId } })
    return !!deleted
  }

  async findMany({
    limit = 10,
    page = 1,
    ...input
  }: Prisma.IndexEntryFindManyArgs & PagingInputFields): Promise<IndexEntryPaging> {
    return this.core.data.indexEntry
      .paginate(input)
      .withPages({ limit, page })
      .then(([data, meta]) => ({ data, meta }))
  }

  async findOne(indexEntryId: string) {
    const found = await this.core.data.indexEntry.findUnique({ where: { id: indexEntryId } })
    if (!found) {
      throw new Error('IndexEntry not found')
    }
    return found
  }

  async update(indexEntryId: string, input: Prisma.IndexEntryUpdateInput) {
    return this.core.data.indexEntry.update({ where: { id: indexEntryId }, data: input })
  }

  async storeTokenAccounts({
    index,
    tokenAccounts,
  }: {
    index: Index
    tokenAccounts: Array<{ pubkey: PublicKey; account: SolanaAccountInfo }>
  }) {
    const tokenAccountAddresses = tokenAccounts.map(({ pubkey }) => pubkey.toBase58())
    const existing = await this.core.data.indexEntry.findMany({
      where: { indexAddress: index.address, cluster: index.cluster, address: { in: tokenAccountAddresses } },
    })
    this.logger.verbose(`[${index.id}] Storing ${tokenAccounts.length} token accounts, existing: ${existing.length}`)

    const items: IndexEntry[] = []

    for (const tokenAccount of tokenAccounts) {
      const found = existing.find((item) => item.address === tokenAccount.pubkey.toString())
      const data = JSON.parse(JSON.stringify(tokenAccount.account))
      const dataHash = hash(data)
      const program = tokenAccount.account.owner.toString()
      const amount = tokenAccount.account.data.parsed.info.tokenAmount.uiAmountString ?? '0'
      const walletId = tokenAccount.account.data.parsed.info.owner.toString()

      if (!found) {
        this.logger.verbose(`[${index.id}] Creating token account ${tokenAccount.pubkey.toString()}`)
        const created = await this.create({
          address: tokenAccount.pubkey.toString(),
          amount,
          cluster: index.cluster,
          data,
          dataHash,
          indexAddress: index.address,
          label: index.label,
          program,
          walletId,
        })
        items.push(created)
        continue
      }

      // If the data is the same, we don't need to update it
      if (found.dataHash === dataHash) {
        this.logger.verbose(`[${index.id}] Skipping token account ${tokenAccount.pubkey.toString()}`)
        items.push(found)
        continue
      }

      this.logger.verbose(`[${index.id}] Updating token account ${tokenAccount.pubkey.toString()}`)
      const updated = await this.update(found.id, { amount, data, dataHash, walletId })
      items.push(updated)
    }
    return items
  }
}
