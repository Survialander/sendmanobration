import migrationRunner from "node-pg-migrate";
import database from "infra/database";
import { join } from "node:path";

export default async function migrations(request, response) {
  const dbClient = await database.getNewClient();

  const migrationsConfig = {
    dbClient: dbClient,
    dryRun: true,
    dir: join("infra", "migrations"),
    direction: "up",
    verbose: true,
    migrationsTable: "pgmigrations",
  };

  const method = request.method;

  if (method === "GET") {
    const pendingMigrations = await migrationRunner({
      ...migrationsConfig,
    });
    await dbClient.end();
    return response.status(200).json(pendingMigrations);
  }

  if (method === "POST") {
    const migratedMigrations = await migrationRunner({
      ...migrationsConfig,
      dryRun: false,
    });

    await dbClient.end();

    return migratedMigrations.length === 0
      ? response.status(200).json(migratedMigrations)
      : response.status(201).json(migratedMigrations);
  }

  return response.status(405).end();
}
