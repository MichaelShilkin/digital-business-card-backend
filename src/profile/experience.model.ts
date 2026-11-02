import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class ExperienceModel {
  @Field(() => Int)
  id: number;

  @Field()
  company: string;

  @Field()
  position: string;

  @Field(() => Date)
  startDate: Date;

  @Field(() => Date, { nullable: true })
  endDate: Date | null;

  @Field()
  achievements: string;
}
