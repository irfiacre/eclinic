import { DataSource } from 'typeorm';
import { Staff } from '../entities/staff.entity';

export const seedStaff = async (dataSource: DataSource) => {
  const staffRepo = dataSource.getRepository(Staff);

  const existing = await staffRepo.count();
  if (existing > 0) {
    console.debug('Staff already has records.');
    return;
  }

  const staffList = [
    {
      firstName: 'Muganga',
      lastName: 'Nurse',
      telephone: '+250780000001',
      email: 'nurse@eclinic.com',
      speciality: 'General Nursing',
      password: 'eclinic@2025',
      role: 'nurse' as const,
    },
    {
      firstName: 'Muganga',
      lastName: 'Admin',
      telephone: '+250780000002',
      email: 'admin@eclinic.com',
      speciality: 'General Nursing',
      password: 'eclinic@2025',
      role: 'admin' as const,
    },
  ];

  await staffRepo.save(staffList);
  console.log('Staff Initial Data Added Successfully!');
};
