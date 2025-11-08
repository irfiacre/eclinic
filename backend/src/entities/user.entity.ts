import { Entity, PrimaryGeneratedColumn, Column, OneToOne } from 'typeorm';
import { PatientInformation } from './patient.information.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  nationalId: string;

  @Column()
  telephone: string;

  @Column({ default: new Date() })
  createdAt: Date;

  @OneToOne(
    () => PatientInformation,
    (patientInformation) => patientInformation.user,
  ) // specify inverse side as a second parameter
  patientInformation: PatientInformation;
}
