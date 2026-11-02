import { Field, Int, ObjectType } from '@nestjs/graphql';
import { SkillModel } from './skill.model';
import { ExperienceModel } from './experience.model';
import { ProjectModel } from './project.model';

@ObjectType()
export class ProfileModel {
  @Field(() => Int)
  id: number;

  @Field()
  name: string;

  @Field()
  title: string;

  @Field(() => String, { nullable: true })
  description: string | null;

  @Field(() => String, { nullable: true })
  email: string | null;

  @Field(() => String, { nullable: true })
  githubUrl: string | null;

  @Field(() => String, { nullable: true })
  linkedinUrl: string | null;

  @Field(() => [SkillModel])
  skills: SkillModel[];

  @Field(() => [ExperienceModel])
  experience: ExperienceModel[];

  @Field(() => [ProjectModel])
  projects: ProjectModel[];
}
