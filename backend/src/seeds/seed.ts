import { AppDataSource } from '../data-source';
import { seedStaff } from './staff.seeder';

async function run() {
  const db = await AppDataSource.initialize();
  console.log('Connected to database');

  await seedStaff(db);

  await db.destroy();
  console.log('Seeding completed.');
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
