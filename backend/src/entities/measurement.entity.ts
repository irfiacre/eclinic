import {
  Entity,
  Column,
  OneToOne,
  PrimaryGeneratedColumn,
  JoinColumn,
} from 'typeorm';
import { PatientCase } from './patient.case.entity';

@Entity()
export class Measurement {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @OneToOne(() => PatientCase, (caseEntity) => caseEntity.patientMeasurement)
  @JoinColumn()
  patientCase: PatientCase;

  @Column()
  temperature: number;

  @Column()
  bloodPressure: number;

  @Column()
  weight: number;

  @Column()
  height: number;

  @Column()
  respirations: number;

  @Column({ default: new Date() })
  public createdAt: Date;
}
