export interface ITask {
  id: string;
  title: string;
  description: string;
  project_id: string;
  worker_user_id: string;
  status: number;
  created_by: string;
  due_date: Date;
  done_at: Date;
  created_at: Date;
}

export interface ICreateTask {
  title: string;
  description: string;
  project_id: string;
  worker_user_id?: string;
  created_by?: string;
  due_date?: Date;
}
export interface IUpdateTask {
  title?: string;
  description?: string;
  worker_user_id?: string;
  status?: number;
  due_date?: Date;
}
export interface IAssignTask {
  task_id: string;
  user_id: string;
}
export interface ITaskFilters {
  created_by?: string;
  project_id?: string;
  org_id?: string;
  worker_user_id?: string;
}
