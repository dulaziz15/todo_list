import { TodoTag } from 'src/todo_tags/entities/todo_tag.entity';
import { Timestamp } from 'typeorm';
import { Column } from 'typeorm';
import { PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Entity } from 'typeorm';

@Entity()
export class Tag {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    create_at: Date;

    @Column()
    update_at: Date;

    @Column()
    delete_at: Date;

    @OneToMany(() => TodoTag, (todotag) => todotag.tag_)
    Tags_id: TodoTag[];
}
