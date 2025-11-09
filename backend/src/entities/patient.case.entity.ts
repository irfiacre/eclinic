import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { User } from './user.entity';
import { PatientInformation } from './patient.information.entity';
import { Measurement } from './measurement.entity';
import { Nurse } from './nurse.entity';

@Entity()
export class PatientCase {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'enum',
    enum: ['pending', 'served'],
    default: 'pending',
  })
  status: 'pending' | 'served';

  @Column({ default: '' })
  decision: string;

  @Column({
    type: 'enum',
    enum: ['critical', 'moderate', 'average', 'safe'],
    default: 'average',
  })
  priority: 'critical' | 'moderate' | 'average' | 'safe';

  @Column({ default: new Date() })
  createdAt: Date;

  @OneToOne(() => User, (user) => user.patientCase)
  @JoinColumn()
  patient: User;

  @OneToOne(
    () => PatientInformation,
    (patientInformation) => patientInformation.patientCase,
  )
  patientInformation: PatientInformation;

  @OneToOne(
    () => Measurement,
    (patientMeasurement) => patientMeasurement.patientCase,
  )
  patientMeasurement: Measurement;

  @OneToOne(() => Nurse, (nurse) => nurse.patientCase)
  assignedNurse: Nurse;
}
