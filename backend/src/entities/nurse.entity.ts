import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { PatientCase } from './patient.case.entity';

@Entity()
export class Nurse {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  telephone: string;

  @Column()
  email: string;

  @Column()
  speciality: string;

  @OneToOne(() => PatientCase, (caseEntity) => caseEntity.assignedNurse)
  @JoinColumn()
  patientCase: PatientCase;

  @Column({ default: new Date() })
  createdAt: Date;
}
