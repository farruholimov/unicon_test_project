import KnexService from '../../../../../database/connection';
import { IOrgUser, ICreateOrgUser } from '../validation/org_users.interface';

export default class OrgUsersDao {
  async create({ org_id, user_id }: ICreateOrgUser): Promise<IOrgUser> {
    return (
      await KnexService.raw(
        `
          insert into organization_users (org_id, user_id, created_at)
          values (?, ?, now());
        `,
        [org_id, user_id]
      )
    ).rows;
  }

  async delete(column_name: string, value: string): Promise<void> {
    await KnexService.raw(`delete from organization_users where ?? = ?`, [column_name, value]);
  }
  async deleteByOrgUser(org_id: string, user_id: string): Promise<void> {
    await KnexService.raw(`delete from organization_users where org_id = ? and user_id = ?`, [org_id, user_id]);
  }

  async selectAll(): Promise<IOrgUser[]> {
    return (
      await KnexService.raw(
        `select 
          organization_users.id, 
          organization_users.org_id, 
          organization_users.user_id
        from organization_users
      `
      )
    ).rows;
  }
  async selectByUser(user_id: string): Promise<IOrgUser[]> {
    return (
      await KnexService.raw(
        `select 
          id, 
          org_id, 
          user_id
        from organization_users
        where user_id = ?
      `,
        [user_id]
      )
    ).rows;
  }
  async selectByOrg(org_id: string): Promise<IOrgUser[]> {
    return (
      await KnexService.raw(
        `select 
          id, 
          org_id, 
          user_id
        from organization_users
        where org_id = ?
      `,
        [org_id]
      )
    ).rows;
  }
  async selectByOrgUser(org_id: string, user_id: string): Promise<IOrgUser[]> {
    return (
      await KnexService.raw(
        `select 
          id, 
          org_id, 
          user_id
        from organization_users
        where org_id = ? and user_id = ?
      `,
        [org_id, user_id]
      )
    ).rows;
  }
}
