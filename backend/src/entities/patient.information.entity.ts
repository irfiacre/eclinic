import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { User } from './user.entity';

@Entity()
export class PatientInformation {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToOne(() => User, (user) => user.patientInformation)
  @JoinColumn()
  user: User;

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
