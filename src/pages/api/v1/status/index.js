import database from "infra/database";

export default async function status(_, response) {
  const updatedAt = new Date().toISOString();

  const [{ server_version: postgresVersion }] = await database.query(
    "SHOW server_version;",
  );
  const [{ max_connections: maxConnections }] = await database.query(
    "SHOW max_connections;",
  );

  const databaseName = process.env.POSTGRES_DB;
  const [{ count: usedConnections }] = await database.query({
    text: "SELECT count(*)::int FROM pg_stat_activity WHERE datname = $1;",
    values: [databaseName],
  });

  response.status(200).json({
    updated_at: updatedAt,
    dependencies: {
      postgres_version: postgresVersion,
      max_connections: parseInt(maxConnections),
      used_connections: usedConnections,
    },
  });
}
