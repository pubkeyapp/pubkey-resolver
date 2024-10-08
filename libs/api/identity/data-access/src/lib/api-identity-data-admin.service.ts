import { Injectable } from '@nestjs/common'
import { Identity as PrismaIdentity } from '@prisma/client'
import { ApiCoreService } from '@pubkey-resolver/api-core-data-access'
import { IdentityAdminCreateInput } from './dto/identity-admin-create.input'
import { IdentityAdminFindManyInput } from './dto/identity-admin-find-many.input'

@Injectable()
export class ApiIdentityDataAdminService {
  constructor(private readonly core: ApiCoreService) {}

  async createIdentity(input: IdentityAdminCreateInput): Promise<PrismaIdentity> {
    const found = await this.core.data.identity.findUnique({
      where: { provider_providerId: { providerId: input.providerId, provider: input.provider } },
    })
    if (found) {
      throw new Error(`Identity ${input.providerId} on ${input.provider} already exists`)
    }
    const created = await this.core.data.identity.create({
      data: {
        providerId: input.providerId,
        provider: input.provider,
        ownerId: input.ownerId,
      },
    })
    if (!created) {
      throw new Error(`Identity ${input.providerId} on ${input.provider} not created`)
    }
    return created
  }

  async deleteIdentity(identityId: string): Promise<boolean> {
    const found = await this.core.data.identity.findUnique({ where: { id: identityId } })
    if (!found) {
      throw new Error(`Identity ${identityId} not found`)
    }
    const deleted = await this.core.data.identity.delete({ where: { id: identityId } })
    if (!deleted) {
      throw new Error(`Identity ${identityId} not deleted`)
    }
    return true
  }

  async findManyIdentity(input: IdentityAdminFindManyInput): Promise<PrismaIdentity[]> {
    const items = await this.core.data.identity.findMany({
      where: {
        ownerId: input.ownerId ? input.ownerId : undefined,
        provider: input.provider ? input.provider : undefined,
      },
      orderBy: [{ provider: 'asc' }, { providerId: 'asc' }],
      include: {
        owner: !input.ownerId,
      },
    })
    return items ?? []
  }
}
