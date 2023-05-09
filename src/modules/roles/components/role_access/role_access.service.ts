import { IRoleAccess, ISelectRoleAccess } from './validation/role_access.interface';
import RolesDao from './dao/role_access.dao';
import ErrorResponse from '../../../shared/utils/errorResponse';

export default class RoleAccessService {
  private rolesDao = new RolesDao();
  async getByRoleModuleLevel({ role_id, module, level }: ISelectRoleAccess): Promise<IRoleAccess> {
    const data = await this.rolesDao.selectByRoleModuleLevel({ role_id, module, level });
    if (!data) throw new ErrorResponse(404, 'Not Found!');
    return data;
  }

  async deleteOne({ role_id, module, level }: ISelectRoleAccess): Promise<void> {
    await this.rolesDao.deleteByRoleModuleLevel({ role_id, module, level });
  }
}
