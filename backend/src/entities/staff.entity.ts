import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { PatientCase } from './patient.case.entity';

@Entity()
export class Staff {
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

  @Column()
  password: string;

  @Column({
    type: 'enum',
    enum: ['admin', 'nurse'],
    default: 'nurse',
  })
  role: 'admin' | 'nurse';

  @Column({ default: new Date() })
  createdAt: Date;
}
