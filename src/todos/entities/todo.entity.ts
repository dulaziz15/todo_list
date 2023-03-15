import { CreateDateColumn, DeleteDateColumn, UpdateDateColumn } from 'typeorm';
import { TodoTag } from 'src/todo_tags/entities/todo_tag.entity';
import { User } from 'src/users/entities/user.entity';
import { Timestamp } from 'typeorm';
import { Column, PrimaryGeneratedColumn, ManyToOne, OneToMany } from 'typeorm';
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

  @OneToMany(() => TodoTag, (todotag) => todotag.todo)
  Todo_tags: TodoTag[];
}
