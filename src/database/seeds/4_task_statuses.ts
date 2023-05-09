import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
  if (Number((await knex("task_statuses").count("id"))[0]?.count)) return

  // Inserts seed entries
  await knex("task_statuses").insert([
    { id: 1, name: "Created" },
    { id: 2, name: "InProgress" },
    { id: 3, name: "Done" }
  ]);
}