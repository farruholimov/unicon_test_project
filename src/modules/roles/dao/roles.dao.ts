import KnexService from '../../../database/connection';
import { IRole } from '../validation/roles.interface';

export default class RolesDao {
  async selectAll(): Promise<IRole[]> {
    return (
      await KnexService.raw(
        `select roles.id, roles.name, jsonb_agg(distinct "role_access") as access_modules
        from roles
        left join role_access on roles.id=role_access.role_id
        group by roles.id
      `
      )
    ).rows;
  }

  async selectById(id: number): Promise<IRole> {
    return (
      await KnexService.raw(
        `select roles.id, roles.name, jsonb_agg(distinct "role_access") as access_modules
        from roles
        left join role_access on roles.id=role_access.role_id
        where roles.id = ?
        group by roles.id
      `,
        [id]
      )
    ).rows[0];
  }

  async deleteById(id: number): Promise<void> {
    await KnexService.raw(`delete from roleswhere roles.id = ?`, [id]);
  }
}
