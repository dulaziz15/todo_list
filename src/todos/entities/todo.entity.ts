import { Tag } from './../../tags/entities/tag.entity';
import {
  CreateDateColumn,
  DeleteDateColumn,
  JoinTable,
  ManyToMany,
  UpdateDateColumn,
} from 'typeorm';
import { User } from 'src/users/entities/user.entity';
import { Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Entity } from 'typeorm';

@Entity()
export class Todo {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  completed: boolean;

  @Column()
  @UpdateDateColumn()
  due_time: Date;

  @ManyToOne(() => User, (user) => user.todos)
  user: User;

  @Column()
  @CreateDateColumn()
  create_at: Date;

  @Column()
  @UpdateDateColumn()
  update_at: Date;

  @Column()
  @DeleteDateColumn()
  delete_at: Date;

  @ManyToMany(() => Tag)
  @JoinTable()
  tags: Tag[];
}
