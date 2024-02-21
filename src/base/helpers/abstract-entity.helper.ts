import { Exclude, Expose } from 'class-transformer';
import {
  PrimaryGeneratedColumn,
  CreateDateColumn,
  DeleteDateColumn,
  UpdateDateColumn,
  Generated,
  Column,
} from 'typeorm';
import { v4 as uuidv4 } from 'uuid';

export abstract class AbstractEntity {
  @Exclude({ toPlainOnly: true })
  @PrimaryGeneratedColumn({ name: 'id' })
  id: number;

  @Generated('uuid')
  @Expose({ name: 'id' })
  @Column({ name: 'secure_id', default: uuidv4(), unique: true })
  secure_id: string;

  @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
  created_at: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp' })
  updated_at: Date;

  @DeleteDateColumn({ name: 'deleted_at', type: 'timestamp' })
  deleted_at: Date;
}
