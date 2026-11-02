import 'dotenv/config';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '../src/generated/prisma/client';
import { profileSeed } from './seed-data';

// By default the seed only fills an empty database and never touches existing data.
// `--reset` wipes the business card data first and restores it from seed-data.ts.
const reset = process.argv.includes('--reset');

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL,
});

const prisma = new PrismaClient({ adapter });

async function main() {
  if (!reset && (await prisma.profile.count()) > 0) {
    console.log('Database is not empty. Seed skipped.');
    return;
  }

  await prisma.$transaction(async (tx) => {
    if (reset) {
      // Also restarts the ids, so the restored profile is always id 1.
      await tx.$executeRaw`TRUNCATE TABLE "Profile" RESTART IDENTITY CASCADE`;
    }

    await tx.profile.create({ data: profileSeed });
  });

  console.log(
    reset
      ? 'Database reset and seeded successfully.'
      : 'Seed completed successfully.',
  );
}

main()
  .catch((error: unknown) => {
    console.error('Seed failed:', error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
