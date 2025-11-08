import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

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

  // Relationships

  @Column({ default: new Date() })
  createdAt: Date;
}
