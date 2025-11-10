import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
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
import { Nurse } from 'src/entities/staff.entity';
import { NurseController } from 'src/controllers/nurse.controller';
import { NurseService } from 'src/services/nurse.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      User,
      Measurement,
      PatientInformation,
      PatientCase,
      Nurse,
    ]),
  ],
  controllers: [
    UsersController,
    MeasurementController,
    PatientCaseController,
    NurseController,
  ],
  providers: [
    UsersService,
    MeasurementService,
    PatientCaseService,
    NurseService,
  ],
  exports: [UsersService, MeasurementService, PatientCaseService, NurseService],
})
export class BaseModule {}
