import {
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { ProfileModel } from './profile.model';

@Injectable()
export class ProfileService {
  private readonly logger = new Logger(ProfileService.name);

  constructor(private readonly prisma: PrismaService) {}

  // Without an id the first profile is returned: the app is a single business card.
  async getProfile(id?: number): Promise<ProfileModel | null> {
    try {
      return await this.prisma.profile.findFirst({
        where: { id },
        orderBy: { id: 'asc' },
        include: {
          skills: true,
          experience: true,
          projects: true,
        },
      });
    } catch (error) {
      this.logger.error(
        'Failed to retrieve profile',
        error instanceof Error ? error.stack : String(error),
      );

      throw new InternalServerErrorException('Failed to load profile');
    }
  }
}
