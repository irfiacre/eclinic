import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { User } from './user.entity';

@Entity()
export class Queue {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToOne(() => User, (user) => user.patientOnQueue)
  @JoinColumn()
  user: User;

  @Column({
    type: 'enum',
    enum: ['pending', 'served'],
    default: 'pending',
  })
  status: 'pending' | 'served';

  @Column({
    type: 'enum',
    enum: ['critical', 'moderate', 'average'],
    default: 'average',
  })
  priority: 'critical' | 'moderate' | 'average';

  @Column({ default: new Date() })
  createdAt: Date;
}
