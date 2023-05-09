import KnexService from '../../../database/connection';
import { getFirst } from '../../shared/utils/utils';
import { IRole } from '../validation/roles.interface';

export default class RolesDao {
  async selectAll(): Promise<IRole[]> {
    return await KnexService('roles')
      .select([
        'roles.id',
        'roles.name',
        'roles.description',
        KnexService.raw('jsonb_agg(distinct "role_access") as access_modules'),
      ])
      .leftJoin('role_access', { 'roles.id': 'role_access_modules.role_id' })
      .groupBy('roles.id');
  }

  async selectById(id: number): Promise<IRole> {
    return getFirst(await KnexService('roles').where({ id }));
  }

  async deleteById(id: number): Promise<void> {
    return await KnexService('roles').where({ id }).delete();
  }
}
