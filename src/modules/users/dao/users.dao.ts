import KnexService from '../../../database/connection';
import { getFirst } from '../../shared/utils/utils';
import { ICreateUser, ISelectUserFilters, IUpdateUser, IUser } from '../validation/users.interface';
import { IDefaultQuery } from 'src/modules/shared/interfaces/query.interface';

export default class UsersDAO {
  async create({ name, role }: ICreateUser): Promise<IUser> {
    return getFirst(await KnexService('users').insert({ role, name }).returning('*'));
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

  async selectAll(filters: ISelectUserFilters, sorts: IDefaultQuery) {
    const { limit, offset, order, orderBy } = sorts;
    return await KnexService('users')
      .select([
        'users.id',
        'users.name',
        'users.role',
        'users.created_by',
        'users.created_at',
        'name as role',
        KnexService.raw(`json_build_object('id', roles.id, 'name', roles.name) as role`),
      ])
      .leftJoin('roles', { 'roles.id': 'users.role' })
      .limit(limit)
      .offset(offset)
      .orderBy(`users.${orderBy}`, order)
      .where(filters)
      .groupBy('users.id', 'roles.id');
  }

  async selectById(id: string) {
    return getFirst(
      await KnexService('users')
        .select([
          'users.id',
          'users.name',
          'users.role',
          'users.created_by',
          'users.created_at',
          'name as role',
          KnexService.raw(`json_build_object('id', roles.id, 'name', roles.name) as role`),
        ])
        .leftJoin('roles', { 'roles.id': 'users.role' })
        .where({ id })
        .groupBy('users.id', 'roles.id')
    );
  }

  async deleteById(id: string): Promise<void> {
    await KnexService('users').where({ id }).delete();
  }
}
