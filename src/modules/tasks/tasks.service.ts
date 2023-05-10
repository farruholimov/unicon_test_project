import { IDefaultQuery } from '../shared/interfaces/query.interface';
import ErrorResponse from '../shared/utils/errorResponse';
import { generateUpdateSetClause } from '../shared/utils/utils';
import TasksDAO from './dao/tasks.dao';
import { ICreateTask, IUpdateTask, ITask, ITaskFilters } from './validation/tasks.interface';

export default class TasksService {
  private tasksDao = new TasksDAO();

  async create({ title, description, project_id, due_date, worker_user_id, created_by }: ICreateTask): Promise<ITask> {
    const data = await this.tasksDao.create({
      title,
      description,
      project_id,
      due_date,
      worker_user_id,
      created_by,
    });
    if (!data) throw new ErrorResponse(500, 'Failed to Create!');
    return data;
  }

  async update(id: string, values: IUpdateTask): Promise<ITask> {
    const data = await this.tasksDao.selectById(id);
    if (!data) throw new ErrorResponse(404, 'Not Found!');

    const body = generateUpdateSetClause(values);
    const updated_data = await this.tasksDao.update(id, body);
    if (!updated_data) throw new ErrorResponse(500, 'Failed to Update!');
    return updated_data;
  }

  async countAll(): Promise<string> {
    return await this.tasksDao.count();
  }

  async getAll(filters: ITaskFilters, sorts: IDefaultQuery): Promise<ITask[]> {
    return await this.tasksDao.selectAll(filters, sorts);
  }

  async getOne(id: string): Promise<ITask> {
    const data = await this.tasksDao.selectById(id);
    if (!data) throw new ErrorResponse(404, 'Not Found!');
    return data;
  }

  async deleteOne(id: string): Promise<void> {
    await this.tasksDao.deleteById(id);
  }
}
