import { Injectable, Logger } from '@nestjs/common'
import { Identity as PrismaIdentity } from '@prisma/client'
import { ApiCoreService } from '@pubkey-resolver/api-core-data-access'
import { IdentityUserFindManyInput } from './dto/identity-user-find-many.input'

@Injectable()
export class ApiIdentityDataUserService {
  private readonly logger = new Logger(ApiIdentityDataUserService.name)
  constructor(private readonly core: ApiCoreService) {}

  async deleteIdentity(userId: string, identityId: string): Promise<boolean> {
    const found = await this.core.data.identity.findFirst({
      where: { id: identityId, ownerId: userId },
      include: { owner: { include: { identities: true } } },
    })
    if (!found) {
      throw new Error(`Identity ${identityId} not found`)
    }
    if (found.owner.identities.length === 1 && !found.owner.password) {
      throw new Error(`Cannot delete last identity`)
    }
    const deleted = await this.core.data.identity.delete({ where: { id: identityId } })
    if (!deleted) {
      throw new Error(`Identity ${identityId} not deleted`)
    }
    return true
  }

  async findManyIdentity(input: IdentityUserFindManyInput): Promise<PrismaIdentity[]> {
    const items = await this.core.data.identity.findMany({
      where: { owner: { username: input.username } },
      orderBy: [{ provider: 'asc' }, { providerId: 'asc' }],
    })

    return items ?? []
  }
}
