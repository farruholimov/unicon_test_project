import { IDefaultQuery } from '../shared/interfaces/query.interface';
import ErrorResponse from '../shared/utils/errorResponse';
import { generateUpdateSetClause } from '../shared/utils/utils';
import UsersDAO from './dao/users.dao';
import { ICreateUser, IUpdateUser, IUser, IUserFilter } from './validation/users.interface';

export default class {
  private usersDao = new UsersDAO();

  async create({ name, role, created_by }: ICreateUser): Promise<IUser> {
    const data = await this.usersDao.create({ name, role, created_by });
    if (!data) throw new ErrorResponse(500, 'Failed to Create!');
    return data;
  }

  async update(id: string, values: IUpdateUser): Promise<IUser> {
    const data = await this.usersDao.selectById(id);
    if (!data) throw new ErrorResponse(404, 'Not Found!');

    const body = generateUpdateSetClause(values);
    const updated_data = await this.usersDao.update(id, body);
    if (!updated_data) throw new ErrorResponse(500, 'Failed to Update!');
    return updated_data;
  }

  async countAll(): Promise<string> {
    return await this.usersDao.count();
  }

  async getAll(filters: IUserFilter, sorts: IDefaultQuery): Promise<IUser[]> {
    return await this.usersDao.selectAll(filters, sorts);
  }

  async getOne(id: string): Promise<IUser> {
    const data = await this.usersDao.selectById(id);
    if (!data) throw new ErrorResponse(404, 'Not Found!');
    return data;
  }

  async getByRole(role: number): Promise<IUser[]> {
    return await this.usersDao.selectByRole(role);
  }

  async deleteOne(id: string): Promise<void> {
    await this.usersDao.deleteById(id);
  }
}
