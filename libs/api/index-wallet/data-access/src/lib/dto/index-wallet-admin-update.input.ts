import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class IndexWalletAdminUpdateInput {
  @Field({ nullable: true })
  updatedAt?: string
}
