import KnexService from '../../../database/connection';
import { ICreateOrg, IOrg } from '../validation/organizations.interface';
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

  async update(id: string, values: string): Promise<IOrg> {
    return (
      await KnexService.raw(
        `
          update organizations 
          set ${values} 
          where id = ?
          returning *;
        `,
        [id]
      )
    ).rows[0];
  }

  async deleteById(id: string): Promise<void> {
    await KnexService.raw(`delete from organizations where id = ?`, [id]);
  }

  async count(): Promise<string> {
    return (await KnexService.raw(`select count (id) as count from organizations;`)).rows[0]['count'];
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
          count (distinct ou.id) users_count,
          count (distinct p.id) as projects_count,
          count (distinct t.id) as tasks_count

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
          count (distinct ou.id) filter (where u.role = 2) as owners_count,
          count (distinct ou.id) filter (where u.role = 3) as staff_count,
          count (distinct p.id) as projects_count,
          count (distinct t.id) as tasks_count,
          count (distinct t.id) filter (where t.status = 1) as new_tasks_count,
          count (distinct t.id) filter (where t.status = 2) as progress_tasks_count,
          count (distinct t.id) filter (where t.status = 3) as finished_tasks_count,

          (select 
            jsonb_agg(
              json_build_object(
                'id', ou.id,
                'created_at', ou.created_at,
                'user', json_build_object(
                  'id', u.id,
                  'name', u.name
                )
              )
            )from organization_users ou
            inner join users u on ou.user_id = u.id
            where ou.org_id = o.id
          ) as staff,

          (select 
            jsonb_agg(
              json_build_object(
                'id', p.id,
                'name', p.name,
                'created_at', p.created_at
              )
            )from projects p
            where p.org_id = o.id
          ) as projects
          
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
    ).rows[0];
  }
}
