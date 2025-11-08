import {
  Entity,
  Column,
  OneToOne,
  PrimaryGeneratedColumn,
  JoinColumn,
} from 'typeorm';
import { User } from './user.entity';

@Entity()
export class Measurement {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @OneToOne(() => User)
  @JoinColumn()
  user: User;

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
