import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { User } from './user.entity';
import { Nurse } from './nurse.entity';

@Entity()
export class Decision {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  decision: string;

  @Column()
  isSent: boolean;

  @OneToOne(() => User)
  @JoinColumn()
  user: User;

  @OneToOne(() => Nurse)
  @JoinColumn()
  nurse: Nurse;

  @Column({ default: new Date() })
  createdAt: Date;
}
