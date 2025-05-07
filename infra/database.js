import { Client } from "pg";

export async function query(queryObject) {
  const client = new Client({
    host: process.env.POSTGRES_HOST,
    port: process.env.POSTGRES_PORT,
    user: process.env.POSTGRES_USER,
    database: process.env.POSTGRES_DB,
    password: process.env.POSTGRES_PASSWORD,
  });

  try {
    await client.connect();
    const res = await client.query(queryObject);
    return res.rows;
  } catch (error) {
    console.error(error);
    throw error;
  } finally {
    await client.end();
  }
}
