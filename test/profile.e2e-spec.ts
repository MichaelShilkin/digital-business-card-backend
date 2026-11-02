import { Test } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { App } from 'supertest/types';
import { AppModule } from './../src/app.module';
import { PrismaService } from './../src/prisma/prisma.service';

describe('Profile GraphQL (e2e)', () => {
  let app: INestApplication<App>;
  const findFirst = jest.fn();

  // The query from the task description: no id, nested skills, experience and projects.
  const profileQuery = `
    query {
      profile {
        name
        description
        skills { name }
        experience { company position }
        projects { name }
      }
    }
  `;

  const profile = {
    id: 1,
    name: 'Mikhail Shilkin',
    title: 'Frontend Developer',
    description: 'Frontend Developer',
    email: null,
    githubUrl: null,
    linkedinUrl: null,
    skills: [{ id: 1, name: 'TypeScript' }],
    experience: [
      {
        id: 1,
        company: 'Company',
        position: 'Frontend Developer',
        startDate: new Date('2026-01-01'),
        endDate: null,
        achievements: 'Built a web platform',
      },
    ],
    projects: [{ id: 1, name: 'Project', description: null, url: null }],
  };

  beforeAll(async () => {
    const moduleFixture = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideProvider(PrismaService)
      .useValue({ profile: { findFirst } })
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  beforeEach(() => {
    findFirst.mockReset();
  });

  afterAll(async () => {
    await app.close();
  });

  it('returns the profile with nested data using a single database query', async () => {
    findFirst.mockResolvedValue(profile);

    const response = await request(app.getHttpServer())
      .post('/graphql')
      .send({ query: profileQuery })
      .expect(200);

    expect(response.body.errors).toBeUndefined();
    expect(response.body.data.profile).toEqual({
      name: 'Mikhail Shilkin',
      description: 'Frontend Developer',
      skills: [{ name: 'TypeScript' }],
      experience: [{ company: 'Company', position: 'Frontend Developer' }],
      projects: [{ name: 'Project' }],
    });
    expect(findFirst).toHaveBeenCalledTimes(1);
  });

  it('returns null when the profile does not exist', async () => {
    findFirst.mockResolvedValue(null);

    const response = await request(app.getHttpServer())
      .post('/graphql')
      .send({ query: '{ profile(id: 999) { name } }' })
      .expect(200);

    expect(response.body.data.profile).toBeNull();
  });

  it('redirects the root address to Apollo Sandbox', async () => {
    await request(app.getHttpServer())
      .get('/')
      .expect(302)
      .expect('Location', '/graphql');
  });

  it('exposes the schema for Apollo Sandbox', async () => {
    const response = await request(app.getHttpServer())
      .post('/graphql')
      .send({ query: '{ __schema { queryType { name } } }' })
      .expect(200);

    expect(response.body.data.__schema.queryType.name).toBe('Query');
  });
});
