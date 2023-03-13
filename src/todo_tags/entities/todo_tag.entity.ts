import { Tag } from 'src/tags/entities/tag.entity';
import { Todo } from 'src/todos/entities/todo.entity';
import { ManyToMany, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Entity } from 'typeorm';

@Entity()
export class TodoTag {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Todo, (todo) => todo.Todo_tags)
    todo_: number;

    @ManyToOne(() => Tag, (tag) => tag.Tags_id)
    tag_: number;
}
