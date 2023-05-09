import KnexService from '../../../../../database/connection';
import { getFirst } from '../../../../shared/utils/utils';
import { IRoleAccess, ISelectRoleAccess } from '../validation/role_access.interface';

export default class RoleAccessDao {
  async selectByRoleModuleLevel({ role_id, module, level }: ISelectRoleAccess): Promise<IRoleAccess> {
    return getFirst(await KnexService('role_access').where({ role_id, module, level }));
  }

  async deleteByRoleModuleLevel({ role_id, module, level }: ISelectRoleAccess): Promise<void> {
    await KnexService('roles').where({ role_id, module, level }).delete();
  }
}
