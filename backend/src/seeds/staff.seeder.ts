import { DataSource } from 'typeorm';
import { Staff } from '../entities/staff.entity';
import * as bcrypt from 'bcrypt';

export const seedStaff = async (dataSource: DataSource) => {
  const staffRepo = dataSource.getRepository(Staff);

  const existing = await staffRepo.count();
  if (existing > 0) {
    console.debug('Staff already has records.');
    return;
  }

  const SEED_PASSWORD = await bcrypt.hash('eclinic@2025', 10);

  const staffList = [
    {
      firstName: 'Muganga',
      lastName: 'Nurse',
      telephone: '+250780000001',
      email: 'nurse@eclinic.com',
      speciality: 'General Nursing',
      password: SEED_PASSWORD,
      role: 'nurse' as const,
    },
    {
      firstName: 'Muganga',
      lastName: 'Admin',
      telephone: '+250780000002',
      email: 'admin@eclinic.com',
      speciality: 'General Nursing',
      password: SEED_PASSWORD,
      role: 'admin' as const,
    },
  ];

  await staffRepo.save(staffList);
  console.log('Staff Initial Data Added Successfully!');
};
