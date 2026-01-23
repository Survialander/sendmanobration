import migrationRunner from "node-pg-migrate";
import database from "infra/database";
import { join } from "node:path";

export default async function migrations(request, response) {
  const alowedMethods = ["GET", "POST"];
  const method = request.method;

  if (!alowedMethods.includes(method)) {
    return response.status(405).json({ message: "Method Not Allowed" });
  }

  let dbClient;

  try {
    dbClient = await database.getNewClient();

    const migrationsConfig = {
      dbClient: dbClient,
      dryRun: true,
      dir: join("infra", "migrations"),
      direction: "up",
      verbose: true,
      migrationsTable: "pgmigrations",
    };

    if (method === "GET") {
      const pendingMigrations = await migrationRunner({
        ...migrationsConfig,
      });
      return response.status(200).json(pendingMigrations);
    }

    if (method === "POST") {
      const migratedMigrations = await migrationRunner({
        ...migrationsConfig,
        dryRun: false,
      });
      return migratedMigrations.length === 0
        ? response.status(200).json(migratedMigrations)
        : response.status(201).json(migratedMigrations);
    }
  } catch (error) {
    console.error(error);
    throw error;
  } finally {
    await dbClient.end();
  }
}
