import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { PatientCase } from './patient.case.entity';

@Entity()
export class PatientInformation {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToOne(() => PatientCase, (caseEntity) => caseEntity.patientInformation)
  @JoinColumn()
  patientCase: PatientCase;

  @Column({ default: null })
  painScale: string;

  @Column({ default: null })
  painLocation: string;

  @Column({ default: null })
  days: string;

  @Column({ default: null })
  chronicDisease: string;

  @Column({ default: null })
  note: string;

  @Column({ default: null })
  recommendation: string;

  @Column({ default: new Date() })
  createdAt: Date;
}
