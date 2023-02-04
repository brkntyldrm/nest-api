import { BeforeInsert, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  
  @Column()
  name: string;
  
  @Column()
  lastname: string;
  
  @Column()
  username: string;

  @Column()
  password: string;

  @Column()
  phone_number: string;

  @Column()
  @CreateDateColumn()
  created_at: Date;
  
  @Column()
  @UpdateDateColumn()
  updated_at: Date;

  @BeforeInsert()
  async hash() {
    this.password = await bcrypt(this.password, 8);
  }
}
