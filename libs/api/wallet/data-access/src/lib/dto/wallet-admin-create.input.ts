import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class WalletAdminCreateInput {
  @Field()
  id!: string
  @Field({ nullable: true })
  label?: string
}
