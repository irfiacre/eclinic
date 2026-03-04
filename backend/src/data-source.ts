import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { Staff } from './entities/staff.entity';
import { PatientCase } from './entities/patient.case.entity';
import * as dotenv from 'dotenv';
import { User } from './entities/user.entity';
import { Measurement } from './entities/measurement.entity';
import { PatientInformation } from './entities/patient.information.entity';

dotenv.config();

export const AppDataSource = new DataSource({
  type: 'postgres',
  url: process.env.DATABASE_URL,
  synchronize: false,
  logging: false,
  entities: [User, Measurement, PatientInformation, PatientCase, Staff],
  migrations: ['dist/migrations/*.js'],
  ssl: {
    rejectUnauthorized: false,
  },
});
