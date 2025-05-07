import { query } from "infra/database";

export default async function status(_, response) {
  const updatedAt = new Date().toISOString();

  const [{ server_version: postgresVersion }] = await query(
    "SHOW server_version;",
  );
  const [{ max_connections: maxConnections }] = await query(
    "SHOW max_connections;",
  );

  const [{ count: usedConnections }] = await query({
    text: "SELECT count(*)::int FROM pg_stat_activity WHERE state = $1;",
    values: ["active"],
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
