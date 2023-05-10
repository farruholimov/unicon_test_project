import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.raw(`
    create extension if not exists "uuid-ossp";
  `);

  await knex.raw(`
    create table if not exists roles(
      id int primary key not null,
      name varchar(32) not null
    );
  `);
  await knex.raw(`
      create table if not exists role_access(
        id serial primary key,
        level varchar(8) not null,
        module varchar(32) not null,
        role_id int not null references roles(id) on delete cascade
    );
  `);
  await knex.raw(`
    create table if not exists users(
      id uuid primary key default uuid_generate_v4(),
      name varchar(64) not null,
      role int not null references roles(id),
      created_by uuid references users(id),
      created_at timestamp(0) not null default current_timestamp
    );
  `);
  await knex.raw(`
    create table if not exists organizations (
      id uuid primary key default uuid_generate_v4(),
      name varchar(32) not null,
      created_by uuid not null references users(id),
      created_at timestamp(0) not null default current_timestamp
    );
  `);
  await knex.raw(`
    create table if not exists organization_users (
      id uuid primary key default uuid_generate_v4(),
      org_id uuid not null references organizations(id) on delete cascade,
      user_id uuid not null references users(id) on delete cascade,
      created_at timestamp(0) not null default current_timestamp
    );
  `);
  await knex.raw(`
    create table if not exists projects (
      id uuid primary key default uuid_generate_v4(),
      name varchar(32) not null,
      org_id uuid not null references organizations(id) on delete cascade,
      created_by uuid not null references users(id),
      created_at timestamp(0) not null default current_timestamp
    );
  `);
  await knex.raw(`
    create table if not exists task_statuses(
      id int primary key not null,
      name varchar(16) not null
    );
  `);
  await knex.raw(`
    create table if not exists tasks (
      id uuid primary key default uuid_generate_v4(),
      title varchar(32) not null,
      description text,
      project_id uuid not null references projects(id) on delete cascade,
      created_by uuid not null references users(id),
      worker_user_id uuid not null references users(id),
      status int not null references task_statuses(id),
      due_date timestamp(0),
      done_at timestamp(0),
      created_at timestamp(0) not null default current_timestamp
    );
  `);
}

export async function down(knex: Knex): Promise<void> {
  await knex.raw(`
    drop table if exists roles;
    drop table if exists role_access;
    drop table if exists tasks;
    drop table if exists users;
    drop table if exists organizations;
    drop table if exists organization_users;
    drop table if exists projects;
    drop table if exists task_statuses;
  `);
}
