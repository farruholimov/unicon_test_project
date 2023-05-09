import { IRole } from './validation/roles.interface';
import RolesDao from './dao/roles.dao';
import ErrorResponse from '../shared/utils/errorResponse';

export default class RolesService {
  private rolesDao = new RolesDao();
  async getOne(id: number): Promise<IRole> {
    const foundRole: IRole = await this.rolesDao.selectById(id);
    if (!foundRole) throw new ErrorResponse(404, 'Not Found!');
    return foundRole;
  }

  async getAll(): Promise<IRole[]> {
    return await this.rolesDao.selectAll();
  }

  async deleteOne(id: number): Promise<void> {
    await this.rolesDao.deleteById(id);
  }
}
