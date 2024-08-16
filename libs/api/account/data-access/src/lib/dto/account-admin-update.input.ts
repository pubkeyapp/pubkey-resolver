import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class AccountAdminUpdateInput {
  @Field({ nullable: true })
  label?: string
}
