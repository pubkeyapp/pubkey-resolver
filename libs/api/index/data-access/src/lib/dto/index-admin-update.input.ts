import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class IndexAdminUpdateInput {
  @Field({ nullable: true })
  label?: string
}
