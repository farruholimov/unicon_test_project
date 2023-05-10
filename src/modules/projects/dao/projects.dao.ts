import KnexService from '../../../database/connection';
import { ICreateProject, IProject, IProjectFilter } from '../validation/projects.interface';
import { IDefaultQuery } from 'src/modules/shared/interfaces/query.interface';

export default class ProjectsDAO {
  async create({ name, org_id, created_by }: ICreateProject): Promise<IProject> {
    return (
      await KnexService.raw(
        `
          insert into projects (name, org_id, created_by, created_at)
          values (?, ?, ?, now())
          returning *;
      `,
        [name, org_id, created_by]
      )
    ).rows[0];
  }

  async update(id: string, values: string): Promise<IProject> {
    return (
      await KnexService.raw(
        `
          update projects
          set ${values} 
          where id = ?
          returning *;
        `,
        [id]
      )
    ).rows[0];
  }

  async deleteById(id: string): Promise<void> {
    await KnexService.raw(`delete from projects where id = ?`, [id]);
  }

  async count(): Promise<string> {
    return (await KnexService.raw(`select count (id) as count from projects;`)).rows[0]['count'];
  }

  async selectAll(filters: IProjectFilter, sorts: IDefaultQuery) {
    const { limit, offset, orderBy, order } = sorts;
    return (
      await KnexService.raw(
        `
        select 
          p.id, 
          p.name, 
          p.created_by, 
          p.created_at,
          count (distinct t.id) as tasks_count,

          json_build_object(
            'id', o.id,
            'name', o.name
          ) as organization,

          json_build_object(
            'id', u.id,
            'name', u.name
          ) as creator

        from projects p
        left join organizations o on p.org_id = o.id
        left join tasks t on p.id = t.project_id
        left join users u on p.created_by = u.id

        ${
          Object.keys(filters).length > 0
            ? ' where ' +
              Object.keys(filters)
                .map((key) => `${key} = '${filters[key]}'`)
                .join(' and ')
            : ''
        }

        group by p.id, o.id, u.id
        order by p.${orderBy} ${order}
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
          p.id, 
          p.name, 
          p.created_by, 
          p.created_at,
          count (distinct t.id) as tasks_count,
          count (distinct t.id) filter (where t.status = 1) as new_tasks_count,
          count (distinct t.id) filter (where t.status = 2) as progress_tasks_count,
          count (distinct t.id) filter (where t.status = 3) as finished_tasks_count,

          json_build_object(
            'id', o.id,
            'name', o.name
          ) as organization,

          json_build_object(
            'id', u.id,
            'name', u.name
          ) as creator,

          (select 
            jsonb_agg(
              json_build_object(
                'id', t.id,
                'title', t.title,
                'status', t.status,
                'status_name', ts.name,
                'created_at', t.created_at,
                'worker_user', 
                  case
                    when u.id is null then null
                    else json_build_object(
                      'id', u.id,
                      'name', u.name
                    )
                  end
              )
            )from tasks t
            left join users u on t.worker_user_id = u.id
            left join task_statuses ts on t.status = ts.id
            where t.project_id = p.id
          ) as tasks

        from projects p
        left join organizations o on p.org_id = o.id
        left join tasks t on p.id = t.project_id
        left join users u on p.created_by = u.id

        where p.id = ?
        group by p.id, o.id, u.id
      `,
        [id]
      )
    ).rows[0];
  }
}
