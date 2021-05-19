import { UserEntity } from 'src/auth/entities/user.entity';
import {
  BeforeInsert,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Address {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  line1: string;

  @Column()
  line2: string;

  @Column()
  city: string;

  @Column()
  state: string;

  @Column({ precision: 6 })
  pincode?: number;

  @Column({ type: 'datetime' })
  createdAt: string;

  //many addresses will be for one userentity
  @ManyToOne((type) => UserEntity, (user) => user.userId)
  userId: UserEntity;
}
