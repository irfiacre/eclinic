import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../entities/user.entity';
import { UsersController } from 'src/controllers/user.controller';
import { UsersService } from 'src/services/user.service';
import { Measurement } from 'src/entities/measurement.entity';
import { PatientInformation } from 'src/entities/patient.information.entity';
import { MeasurementService } from 'src/services/measurement.service';
import { MeasurementController } from 'src/controllers/measurement.controller';
import { Queue } from 'src/entities/queue.entity';
import { QueueService } from 'src/services/queue.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Measurement, PatientInformation, Queue]),
  ],
  controllers: [UsersController, MeasurementController],
  providers: [UsersService, MeasurementService, QueueService],
  exports: [UsersService, MeasurementService, QueueService],
})
export class BaseModule {}
