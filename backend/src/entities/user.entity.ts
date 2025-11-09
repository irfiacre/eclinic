import { Entity, PrimaryGeneratedColumn, Column, OneToOne } from 'typeorm';
import { PatientInformation } from './patient.information.entity';
import { Measurement } from './measurement.entity';
import { Queue } from './queue.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  nationalId: string;

  @Column()
  telephone: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({ default: new Date() })
  createdAt: Date;

  @OneToOne(
    () => PatientInformation,
    (patientInformation) => patientInformation.user,
  )
  patientInformation: PatientInformation;

  @OneToOne(() => Measurement, (patientMeasurement) => patientMeasurement.user)
  patientMeasurement: Measurement;

  @OneToOne(() => Queue, (patientOnQueue) => patientOnQueue.user)
  patientOnQueue: Queue;
}
