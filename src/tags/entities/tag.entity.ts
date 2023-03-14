import { TodoTag } from 'src/todo_tags/entities/todo_tag.entity';
import { CreateDateColumn, DeleteDateColumn, Timestamp, UpdateDateColumn } from 'typeorm';
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
    @CreateDateColumn()
    create_at: Date;

    @Column()
    @UpdateDateColumn()
    update_at: Date;

    @Column()
    @DeleteDateColumn()
    delete_at: Date;

    @OneToMany(() => TodoTag, (todotag) => todotag.tag_)
    Tags_id: TodoTag[];
}
