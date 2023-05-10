import { IsDateString, IsDefined, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { ICreateTask, IUpdateTask } from './tasks.interface';

export class CreateTaskDTO implements ICreateTask {
  @IsString()
  @IsDefined()
  @IsNotEmpty()
  title: string;

  @IsString()
  description: string;

  @IsString()
  @IsDefined()
  @IsNotEmpty()
  project_id: string;

  @IsString()
  @IsDefined()
  @IsNotEmpty()
  worker_user_id: string;

  @IsDefined()
  @IsNotEmpty()
  @IsDateString()
  due_date: Date;
}
export class UpdateTaskDTO implements IUpdateTask {
  @IsString()
  title: string;

  @IsString()
  description: string;

  @IsNumber()
  status: number;

  @IsDateString()
  due_date: Date;
}

export class AssignTaskDTO {
  @IsString()
  @IsDefined()
  @IsNotEmpty()
  user_id: string;

  @IsString()
  @IsDefined()
  @IsNotEmpty()
  task_id: string;
}
