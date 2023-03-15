export class SingleTodoDto {
    id: number;
    title: string;
    description: string;
    completed: boolean;
    due_time: Date;
    create_at: Date;
    update_at: Date;
    delete_at: Date;
    tags: string[];
}