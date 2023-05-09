import { IDefaultQuery } from '../shared/interfaces/query.interface';
import ErrorResponse from '../shared/utils/errorResponse';
import UsersDAO from './dao/users.dao';
import { ICreateUser, ISelectUserFilters, IUpdateUser, IUser } from './validation/users.interface';

export default class {
  private usersDao = new UsersDAO();

  async create({ name, role }: ICreateUser): Promise<IUser> {
    const data = await this.usersDao.create({ name, role });
    if (!data) throw new ErrorResponse(500, 'Failed to Create!');
    return data;
  }

  async update(id: string, values: IUpdateUser): Promise<IUser> {
    const data = await this.usersDao.selectById(id);
    if (!data) throw new ErrorResponse(404, 'Not Found!');

    const updated_data = await this.usersDao.update(id, values);
    if (!updated_data) throw new ErrorResponse(500, 'Failed to Update!');
    return data;
  }

  async getAll(filters: ISelectUserFilters, sorts: IDefaultQuery): Promise<IUser[]> {
    return await this.usersDao.selectAll(filters, sorts);
  }

  async getOne(id: string): Promise<IUser> {
    const data = await this.usersDao.selectById(id);
    if (!data) throw new ErrorResponse(404, 'Not Found!');
    return data;
  }

  async deleteOne(id: string): Promise<void> {
    await this.usersDao.deleteById(id);
  }
}
