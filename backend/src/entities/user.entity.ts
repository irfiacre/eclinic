import { Entity, PrimaryGeneratedColumn, Column, OneToOne } from 'typeorm';
import { PatientCase } from './patient.case.entity';

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

  @OneToOne(() => PatientCase, (patientCase) => patientCase.patient)
  patientCase: PatientCase;
}
