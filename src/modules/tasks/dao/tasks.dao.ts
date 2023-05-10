import KnexService from '../../../database/connection';
import { ICreateTask, ITask, ITaskFilters } from '../validation/tasks.interface';
import { IDefaultQuery } from 'src/modules/shared/interfaces/query.interface';

export default class TasksDAO {
  async create({ title, description, project_id, due_date, worker_user_id, created_by }: ICreateTask): Promise<ITask> {
    return (
      await KnexService.raw(
        `
          insert into tasks (title, description, project_id, due_date, worker_user_id, created_by, created_at)
          values (?, ?, ?, ?, ?, ?, now())
          returning *;
      `,
        [title, description ?? null, project_id, due_date, worker_user_id, created_by]
      )
    ).rows[0];
  }

  async update(id: string, values: string): Promise<ITask> {
    return (
      await KnexService.raw(
        `
          update tasks 
          set ${values} 
          where id = ?
          returning *;
        `,
        [id]
      )
    ).rows[0];
  }

  async deleteById(id: string): Promise<void> {
    await KnexService.raw(`delete from tasks where id = ?`, [id]);
  }

  async count(): Promise<string> {
    return (await KnexService.raw(`select count (id) as count from tasks;`)).rows[0]['count'];
  }

  async selectAll(filters: ITaskFilters, sorts: IDefaultQuery) {
    const { limit, offset, orderBy, order } = sorts;
    return (
      await KnexService.raw(
        `
        select 
          t.*,
          json_build_object(
            'id', p.id,
            'name', p.name,
            'created_at', p.created_at,
            'organization', json_build_object(
                'id', o.id,
                'name', o.name
              )
          ) as project,

          json_build_object(
            'id', u.id,
            'name', u.name
          ) as creator

        from tasks t
        left join projects p on p.id = t.project_id
        left join organizations o on p.org_id = o.id
        left join users u on t.created_by = u.id
        ${
          Object.keys(filters).length > 0
            ? ' where ' +
              Object.keys(filters)
                .map((key) => (key == 'org_id' ? `o.id = '${filters[key]}'` : `${key} = '${filters[key]}'`))
                .join(' and ')
            : ''
        }
        group by t.id, p.id, o.id, u.id
        order by t.${orderBy} ${order}
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
          t.*,
          json_build_object(
            'id', p.id,
            'name', p.name,
            'created_at', p.created_at,
            'organization', json_build_object(
                'id', o.id,
                'name', o.name
              )
          ) as project,
          
          json_build_object(
            'id', u.id,
            'name', u.name
          ) as creator,

          (case
            when w.id is null then null
            else json_build_object(
                  'id', w.id,
                  'name', w.name
                )
          end) as worker_user

        from tasks t
        left join projects p on p.id = t.project_id
        left join organizations o on p.org_id = o.id
        left join users u on t.created_by = u.id
        left join users w on t.worker_user_id = w.id
        where t.id = ?
        group by t.id, p.id, o.id, u.id, w.id
      `,
        [id]
      )
    ).rows[0];
  }
}
