import { Entity, PrimaryGeneratedColumn, Column, BeforeInsert } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Entity({ name: 'user' })
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  userId: string;

  @Column({ nullable: false })
  userName: string;

  @Column({ nullable: false, unique: true })
  userEmail: string;

  @Column({ nullable: false })
  userPassword: string; // plain text password

  @Column({ type: 'datetime' })
  createdAt: Date;

  // hooks : tasks to be executed
  // this gets executed before every insert operation
  @BeforeInsert()
  async hashPassword() {
    this.userPassword = await bcrypt.hash(this.userPassword, 10); // hashed password
  }
}
