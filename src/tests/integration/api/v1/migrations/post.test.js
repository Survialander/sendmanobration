import database from "infra/database";

beforeAll(database.cleanDatabase);

test("POST to /api/v1/migrations should return 200", async () => {
  const response = await fetch("http://localhost:3000/api/v1/migrations", {
    method: "POST",
  });
  const body = await response.json();
  expect(response.status).toBe(201);
  expect(Array.isArray(body)).toBe(true);
  expect(body.length).toBeGreaterThan(0);

  const response2 = await fetch("http://localhost:3000/api/v1/migrations");
  const response2body = await response2.json();
  expect(response2.status).toBe(200);
  expect(Array.isArray(response2body)).toBe(true);
  expect(response2body.length).toBe(0);
});
