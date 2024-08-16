import { Field, ObjectType } from '@nestjs/graphql'

@ObjectType()
export class AppConfig {
  @Field()
  authGithubEnabled!: boolean
  @Field()
  authPasswordEnabled!: boolean
  @Field()
  authRegisterEnabled!: boolean
}
