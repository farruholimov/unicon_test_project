import { IDefaultQuery } from '../shared/interfaces/query.interface';
import ErrorResponse from '../shared/utils/errorResponse';
import { generateUpdateSetClause } from '../shared/utils/utils';
import OrgsDAO from './dao/organizations.dao';
import { ICreateOrg, IUpdateOrg, IOrg } from './validation/organizations.interface';

export default class OrgsService {
  private orgsDao = new OrgsDAO();

  async create({ name, created_by }: ICreateOrg): Promise<IOrg> {
    const data = await this.orgsDao.create({ name, created_by });
    if (!data) throw new ErrorResponse(500, 'Failed to Create!');
    return data;
  }

  async update(id: string, values: IUpdateOrg): Promise<IOrg> {
    const data = await this.orgsDao.selectById(id);
    if (!data) throw new ErrorResponse(404, 'Not Found!');

    const body = generateUpdateSetClause(values);
    const updated_data = await this.orgsDao.update(id, body);
    if (!updated_data) throw new ErrorResponse(500, 'Failed to Update!');
    return updated_data;
  }

  async getAll(sorts: IDefaultQuery): Promise<IOrg[]> {
    return await this.orgsDao.selectAll(sorts);
  }

  async countAll(): Promise<string> {
    return await this.orgsDao.count();
  }

  async getOne(id: string): Promise<IOrg> {
    const data = await this.orgsDao.selectById(id);
    if (!data) throw new ErrorResponse(404, 'Not Found!');
    return data;
  }

  async deleteOne(id: string): Promise<void> {
    await this.orgsDao.deleteById(id);
  }
}
