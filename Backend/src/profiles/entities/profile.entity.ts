import { Entity, Column, PrimaryGeneratedColumn, OneToOne } from 'typeorm';
import { Exclude } from 'class-transformer';
import { User } from 'src/users/entities/user.entity';

@Entity()
export class Profile {
  @PrimaryGeneratedColumn('uuid')
  @Exclude()
  id: string;

  @Column({ nullable: true, default: '' })
  first: string;

  @Column({ nullable: true, default: '' })
  lastname: string;

  @Column({ nullable: true, default: 0 })
  age: number;

  @Column({ nullable: true, default: '' })
  currency: string;

  @Column({ nullable: true, default: '' })
  country: string;

  @Column({ nullable: true, default: '' })
  city: string;

  @Column({ nullable: true })
  avatar: string;

  @OneToOne(() => User, (user) => user.profile, {
    onDelete: 'CASCADE',
  })
  @Exclude()
  user: User;
}
