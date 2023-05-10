import { IDefaultQuery } from '../shared/interfaces/query.interface';
import ErrorResponse from '../shared/utils/errorResponse';
import { generateUpdateSetClause } from '../shared/utils/utils';
import ProjectsDAO from './dao/projects.dao';
import { ICreateProject, IUpdateProject, IProject, IProjectFilter } from './validation/projects.interface';

export default class ProjectsService {
  private projectsDao = new ProjectsDAO();

  async create({ name, org_id, created_by }: ICreateProject): Promise<IProject> {
    const data = await this.projectsDao.create({ name, org_id, created_by });
    if (!data) throw new ErrorResponse(500, 'Failed to Create!');
    return data;
  }

  async update(id: string, values: IUpdateProject): Promise<IProject> {
    const data = await this.projectsDao.selectById(id);
    if (!data) throw new ErrorResponse(404, 'Not Found!');

    const body = generateUpdateSetClause(values);
    const updated_data = await this.projectsDao.update(id, body);
    if (!updated_data) throw new ErrorResponse(500, 'Failed to Update!');
    return updated_data;
  }

  async countAll(): Promise<string> {
    return await this.projectsDao.count();
  }

  async getAll(filters: IProjectFilter, sorts: IDefaultQuery): Promise<IProject[]> {
    return await this.projectsDao.selectAll(filters, sorts);
  }

  async getOne(id: string): Promise<IProject> {
    const data = await this.projectsDao.selectById(id);
    if (!data) throw new ErrorResponse(404, 'Not Found!');
    return data;
  }

  async deleteOne(id: string): Promise<void> {
    await this.projectsDao.deleteById(id);
  }
}
