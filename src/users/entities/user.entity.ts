import { Todo } from "src/todos/entities/todo.entity";
import { Hash } from "crypto";
import * as bcrypt from "bcryptjs";
import { BaseEntity, BeforeInsert, Column, Entity, OneToMany, PrimaryGeneratedColumn, Timestamp, UpdateDateColumn } from "typeorm";
import { CreateUserDto } from "../dto/create-user.dto";

@Entity()
export class User extends BaseEntity{

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column({ unique: true })
    email: string;

    @Column()
    password: string;

    @BeforeInsert()
    async hashPassword() {
        this.password = await bcrypt.hash(this.password, 8);
    }

    async validatePassword(password: string): Promise<boolean> {
        return bcrypt.compare(password, this.password);
    }

    @Column()
    @UpdateDateColumn()
    create_at: Date;

    @Column()
    @UpdateDateColumn()
    update_at: Date;

    @Column()
    @UpdateDateColumn()
    delete_at: Date;

    @OneToMany(() => Todo, (todo) => todo.user_)
    todos: Todo[];
}
