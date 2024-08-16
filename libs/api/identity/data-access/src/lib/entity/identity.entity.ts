import { Field, HideField, ObjectType } from '@nestjs/graphql'
import { User } from '@pubkey-resolver/api-user-data-access'
import { GraphQLJSON } from 'graphql-scalars'
import { IdentityProvider } from './identity-provider.enum'

@ObjectType()
export class Identity {
  @Field()
  id!: string
  @Field()
  createdAt!: Date
  @Field()
  updatedAt!: Date

  @Field(() => IdentityProvider)
  provider!: IdentityProvider
  @Field()
  providerId!: string
  @Field({ nullable: true })
  name?: string
  @Field(() => GraphQLJSON, { nullable: true })
  profile?: JSON
  @Field({ nullable: true })
  verified?: boolean
  @Field(() => User, { nullable: true })
  owner?: User
  @HideField()
  accessToken?: string
  @HideField()
  refreshToken?: string
}
