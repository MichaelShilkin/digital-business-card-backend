import { InternalServerErrorException, Logger } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { PrismaService } from '../prisma/prisma.service';
import { ProfileService } from './profile.service';

describe('ProfileService', () => {
  let service: ProfileService;
  const findFirst = jest.fn();

  beforeEach(async () => {
    findFirst.mockReset();

    const moduleRef = await Test.createTestingModule({
      providers: [
        ProfileService,
        { provide: PrismaService, useValue: { profile: { findFirst } } },
      ],
    }).compile();

    service = moduleRef.get(ProfileService);
  });

  it('loads the profile with its related data in a single query', async () => {
    const profile = { id: 1, name: 'Test' };
    findFirst.mockResolvedValue(profile);

    await expect(service.getProfile(1)).resolves.toBe(profile);

    expect(findFirst).toHaveBeenCalledTimes(1);
    expect(findFirst).toHaveBeenCalledWith({
      where: { id: 1 },
      orderBy: { id: 'asc' },
      include: { skills: true, experience: true, projects: true },
    });
  });

  it('does not filter by id when none is given', async () => {
    findFirst.mockResolvedValue({ id: 1, name: 'Test' });

    await service.getProfile();

    expect(findFirst).toHaveBeenCalledWith(
      expect.objectContaining({ where: { id: undefined } }),
    );
  });

  it('returns null when the profile does not exist', async () => {
    findFirst.mockResolvedValue(null);

    await expect(service.getProfile(999)).resolves.toBeNull();
  });

  it('throws InternalServerErrorException when the query fails', async () => {
    jest.spyOn(Logger.prototype, 'error').mockImplementation();
    findFirst.mockRejectedValue(new Error('database is down'));

    await expect(service.getProfile(1)).rejects.toThrow(
      InternalServerErrorException,
    );
  });
});
