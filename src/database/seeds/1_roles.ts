import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
  if (Number((await knex("roles").count("id"))[0]?.count)) return

  // Inserts seed entries
  await knex("roles").insert([
    { id: 1, name: "Admin" },
    { id: 2, name: "OrgOwner" },
    { id: 3, name: "OrgStaff" }
  ]);
}