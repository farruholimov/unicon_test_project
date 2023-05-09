import KnexService from '../../../database/connection';
import { getFirst } from '../../shared/utils/utils';
import { ICreateOrg, IUpdateOrg, IOrg } from '../validation/organizations.interface';
import { IDefaultQuery } from 'src/modules/shared/interfaces/query.interface';

export default class OrgsDAO {
  async create({ name, created_by }: ICreateOrg): Promise<IOrg> {
    return (
      await KnexService.raw(
        `
          insert into organizations (name, created_by, created_at)
          values (?, ?, now())
          returning *;
      `,
        [name, created_by]
      )
    ).rows[0];
  }

  async update(id: string, values: IUpdateOrg): Promise<IOrg> {
    return getFirst(
      await KnexService('organizations')
        .update({
          ...values,
        })
        .where({ id })
        .returning('*')
    );
  }

  async deleteById(id: string): Promise<void> {
    await KnexService.raw(`delete from organizations where id = ?`, [id]);
  }

  async selectAll(sorts: IDefaultQuery) {
    const { limit, offset, orderBy, order } = sorts;
    return (
      await KnexService.raw(
        `
        select 
          o.id, 
          o.name, 
          o.created_by, 
          o.created_at,
          count (ou.id) users_count
          count (p.id) as projects_count
          count (t.id) as tasks_count

        from organizations o
        left join projects p on o.id = p.org_id
        left join tasks t on p.id = t.project_id
        left join organization_users ou on o.id = ou.org_id
        group by o.id
        order by o.${orderBy} ${order}
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
          o.id, 
          o.name, 
          o.created_by, 
          o.created_at,
          count (ou.id) filter (where u.role = 2) as owners_count,
          count (ou.id) filter (where u.role = 3) as staff_count,
          count (p.id) as projects_count,
          count (t.id) as tasks_count,
          count (t.id) filter (where t.status = 1) as new_tasks_count,
          count (t.id) filter (where t.status = 2) as progress_tasks_count,
          count (t.id) filter (where t.status = 3) as finished_tasks_count,

          jsonb_agg(distinct ou) as staff,
          jsonb_agg(distinct p) as projects,
          jsonb_agg(distinct t) as tasks

        from organizations o
        left join projects p on o.id = p.org_id
        left join tasks t on p.id = t.project_id
        left join organization_users ou on o.id = ou.org_id
        left join users u on ou.user_id = u.id

        where o.id = ?
        group by o.id
      `,
        [id]
      )
    ).rows;
  }
}
