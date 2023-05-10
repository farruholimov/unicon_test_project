import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.raw(`
    alter table organization_users
    add constraint org_user_unique_constraint unique (org_id, user_id);
  `);
}

export async function down(knex: Knex): Promise<void> {
  await knex.raw(`
    alter table organization_users
    drop constraint org_user_unique_constraint;
  `);
}
