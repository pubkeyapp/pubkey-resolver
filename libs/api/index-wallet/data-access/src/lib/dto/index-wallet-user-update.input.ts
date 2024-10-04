import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class IndexWalletUserUpdateInput {
  @Field({ nullable: true })
  updatedAt?: string
}
