import { Todo } from './../entities/todo.entity';
export class SingleTodoDto {
    public id: number;
    public title: string;
    public description: string;
    public completed: boolean;
    public due_time: Date;
    public create_at: Date;
    public update_at: Date;
    public delete_at: Date;
    public tags: SingleTagDto[];
  
    FromEntity(todo: Todo): SingleTodoDto {
      return <SingleTodoDto>{
        id: todo.id,
        title: todo.title,
        description: todo.description,
        completed: todo.completed,
        due_time: todo.due_time,
        create_at: todo.create_at,
        update_at: todo.update_at,
        delete_at: todo.delete_at,
        tags: todo.Todo_tags.map(
          (todoTag) =>
            <SingleTagDto>{
              id: todoTag.tag.id,
              name: todoTag.tag.name,
            },
        ),
      };
    }
  }

  export class SingleTagDto {
    public id: number;
    public name: string;
  }