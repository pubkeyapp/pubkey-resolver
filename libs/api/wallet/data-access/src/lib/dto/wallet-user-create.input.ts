import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class WalletUserCreateInput {
  @Field()
  id!: string
  @Field({ nullable: true })
  label?: string
}
