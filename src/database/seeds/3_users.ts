import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
  if (
    Number(
      (
        await knex("users")
          .count("id")
          .where({ role: 1 })
      )[0]?.count
    )
  ) return

  // Inserts seed entries
  await knex("users").insert(
    { name: "Admin", role: 1 }
  );
}