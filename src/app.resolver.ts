import { Args, Int, Query, Resolver } from '@nestjs/graphql';
import { ProfileModel } from './profile/profile.model';
import { ProfileService } from './profile/profile.service';

@Resolver()
export class AppResolver {
  constructor(private readonly profileService: ProfileService) {}

  @Query(() => ProfileModel, { nullable: true })
  profile(
    @Args('id', { type: () => Int, nullable: true }) id?: number,
  ): Promise<ProfileModel | null> {
    return this.profileService.getProfile(id);
  }
}
