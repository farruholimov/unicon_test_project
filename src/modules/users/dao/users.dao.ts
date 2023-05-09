import KnexService from '../../../database/connection';
import { getFirst } from '../../shared/utils/utils';
import { ICreateUser, IUpdateUser, IUser } from '../validation/users.interface';
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

  async update(id: string, values: IUpdateUser): Promise<IUser> {
    return getFirst(
      await KnexService('users')
        .update({
          ...values,
        })
        .where({ user_id: id })
        .returning('*')
    );
  }

  async selectAll(sorts: IDefaultQuery) {
    const { limit, offset, orderBy, order } = sorts;
    return (
      await KnexService.raw(
        `
        select 
          users.id, users.name, users.role, users.created_by, users.created_at,
          json_build_object('id', roles.id, 'name', roles.name) as role_details
        from users as users
        left join roles on users.role = roles.id
        group by users.id, roles.id
        order by users.${orderBy} ${order}
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
          users.id, users.name, users.role, users.created_by, users.created_at,
          json_build_object('id', roles.id, 'name', roles.name) as role_details
        from users as users
        left join roles on users.role = roles.id
        where users.id = ?
        group by users.id, roles.id
      `,
        [id]
      )
    ).rows[0];
  }

  async selectByRole(role: number): Promise<IUser> {
    return (
      await KnexService.raw(
        `
        select 
          users.id, users.name, users.role, users.created_by, users.created_at,
          json_build_object('id', roles.id, 'name', roles.name) as role_details
        from users as users
        left join roles on users.role = roles.id
        where users.id = ?
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
