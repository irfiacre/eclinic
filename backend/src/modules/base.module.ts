import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../entities/user.entity';
import { UsersController } from 'src/controllers/user.controller';
import { UsersService } from 'src/services/user.service';
import { Measurement } from 'src/entities/measurement.entity';
import { PatientInformation } from 'src/entities/patient.information.entity';
import { MeasurementService } from 'src/services/measurement.service';
import { MeasurementController } from 'src/controllers/measurement.controller';

@Module({
  imports: [TypeOrmModule.forFeature([User, Measurement, PatientInformation])],
  controllers: [UsersController, MeasurementController],
  providers: [UsersService, MeasurementService],
  exports: [UsersService, MeasurementService],
})
export class BaseModule {}
