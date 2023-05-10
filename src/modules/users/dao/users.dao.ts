import KnexService from '../../../database/connection';
import { ICreateUser, IUser, IUserFilter } from '../validation/users.interface';
import { IDefaultQuery } from 'src/modules/shared/interfaces/query.interface';

export default class UsersDAO {
  async create({ name, role, created_by }: ICreateUser): Promise<IUser> {
    return (
      await KnexService.raw(
        `
          insert into users (name, role, created_by, created_at)
          values (?, ?, ?, now())
          returning *;
      `,
        [name, role, created_by]
      )
    ).rows[0];
  }

  async update(id: string, values: string): Promise<IUser> {
    return (
      await KnexService.raw(
        `
          update users 
          set ${values} 
          where id = ?
          returning *;
        `,
        [id]
      )
    ).rows[0];
  }

  async count(): Promise<string> {
    return (await KnexService.raw(`select count (id) as count from users;`)).rows[0]['count'];
  }

  async selectAll(filters: IUserFilter, sorts: IDefaultQuery) {
    const { limit, offset, orderBy, order } = sorts;
    return (
      await KnexService.raw(
        `
        select 
          u.*,
          json_build_object('id', r.id, 'name', r.name) as role

        from users u
        left join roles r on u.role = r.id
        left join organization_users ou on u.id = ou.user_id
        ${
          Object.keys(filters).length > 0
            ? ' where ' +
              Object.keys(filters)
                .map((key) => (key == 'org_id' ? `ou.org_id = '${filters[key]}'` : `${key} = '${filters[key]}'`))
                .join(' and ')
            : ''
        }
        group by u.id, r.id, ou.id
        order by u.${orderBy} ${order}
        limit ${limit}
        offset ${offset}
      `
      )
    ).rows;
  }

  async selectById(id: string) {
    return (
      await KnexService.raw(
        `
        select 
          u.*,
          json_build_object('id', r.id, 'name', r.name) as role,
          (select 
            jsonb_agg(
              json_build_object(
                'id', ou.id,
                'created_at', ou.created_at,
                'organization', json_build_object(
                  'id', o.id,
                  'name', o.name
                )
              )
            )from organization_users ou
            inner join organizations o on ou.org_id = o.id
            where ou.user_id = u.id
          ) as org_user_data

        from users u
        left join roles r on u.role = r.id
        where u.id = ?
        group by u.id, r.id
      `,
        [id]
      )
    ).rows[0];
  }

  async selectByRole(role: number): Promise<IUser[]> {
    return (
      await KnexService.raw(
        `
        select 
          users.id, users.name, users.role, users.created_by, users.created_at,
          json_build_object('id', roles.id, 'name', roles.name) as role_details
        from users as users
        left join roles on users.role = roles.id
        where users.role = ?
        group by users.id, roles.id
      `,
        [role]
      )
    ).rows;
  }

  async deleteById(id: string): Promise<void> {
    await KnexService.raw(`delete from users where id = ?`, [id]);
  }
}
