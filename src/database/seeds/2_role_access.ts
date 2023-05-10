import { Knex } from 'knex';

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex('role_access').del();

  // Inserts seed entries
  await knex('role_access').insert([
    { role_id: 1, module: 'roles', level: 'read' },
    { role_id: 1, module: 'users', level: 'create' },
    { role_id: 1, module: 'users', level: 'read' },
    { role_id: 1, module: 'users', level: 'update' },
    { role_id: 1, module: 'users', level: 'delete' },
    { role_id: 1, module: 'organizations', level: 'create' },
    { role_id: 1, module: 'organizations', level: 'read' },
    { role_id: 1, module: 'organizations', level: 'update' },
    { role_id: 1, module: 'organizations', level: 'delete' },
    { role_id: 1, module: 'organization_users', level: 'create' },
    { role_id: 1, module: 'organization_users', level: 'read' },
    { role_id: 1, module: 'organization_users', level: 'update' },
    { role_id: 1, module: 'organization_users', level: 'delete' },
    { role_id: 1, module: 'projects', level: 'create' },
    { role_id: 1, module: 'projects', level: 'read' },
    { role_id: 1, module: 'projects', level: 'update' },
    { role_id: 1, module: 'projects', level: 'delete' },
    { role_id: 1, module: 'tasks', level: 'create' },
    { role_id: 1, module: 'tasks', level: 'read' },
    { role_id: 1, module: 'tasks', level: 'update' },
    { role_id: 1, module: 'tasks', level: 'delete' },
    { role_id: 1, module: 'stats_all', level: 'read' },
    { role_id: 1, module: 'stats_org', level: 'read' },
    { role_id: 1, module: 'stats_project', level: 'read' },

    { role_id: 2, module: 'stats_org', level: 'read' },
    { role_id: 2, module: 'stats_project', level: 'read' },
    { role_id: 2, module: 'organization_users', level: 'read' },
    { role_id: 2, module: 'organizations', level: 'read' },
    { role_id: 2, module: 'projects', level: 'create' },
    { role_id: 2, module: 'projects', level: 'read' },
    { role_id: 2, module: 'projects', level: 'update' },
    { role_id: 2, module: 'projects', level: 'delete' },
    { role_id: 2, module: 'tasks', level: 'create' },
    { role_id: 2, module: 'tasks', level: 'read' },
    { role_id: 2, module: 'tasks', level: 'update' },
    { role_id: 2, module: 'tasks', level: 'delete' },

    { role_id: 3, module: 'projects', level: 'read' },
    { role_id: 3, module: 'organizations', level: 'read' },
    { role_id: 3, module: 'tasks', level: 'read' },
    { role_id: 3, module: 'tasks', level: 'update' },
  ]);
}
