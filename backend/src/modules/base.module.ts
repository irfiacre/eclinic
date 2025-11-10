import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { User } from '../entities/user.entity';
import { UsersController } from 'src/controllers/user.controller';
import { UsersService } from 'src/services/user.service';
import { Measurement } from 'src/entities/measurement.entity';
import { PatientInformation } from 'src/entities/patient.information.entity';
import { MeasurementService } from 'src/services/measurement.service';
import { MeasurementController } from 'src/controllers/measurement.controller';
import { PatientCase } from 'src/entities/patient.case.entity';
import { PatientCaseService } from 'src/services/patient.case.service';
import { PatientCaseController } from 'src/controllers/patient.case.controller';
import { Staff } from 'src/entities/staff.entity';
import { StaffController } from 'src/controllers/staff.controller';
import { StaffService } from 'src/services/staff.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      User,
      Measurement,
      PatientInformation,
      PatientCase,
      Staff,
    ]),
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'secret_key',
      signOptions: { expiresIn: '1w' },
    }),
  ],
  controllers: [
    UsersController,
    MeasurementController,
    PatientCaseController,
    StaffController,
  ],
  providers: [
    UsersService,
    MeasurementService,
    PatientCaseService,
    StaffService,
  ],
  exports: [UsersService, MeasurementService, PatientCaseService, StaffService],
})
export class BaseModule {}
