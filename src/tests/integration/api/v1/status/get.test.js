test("get to /api/v1/status should return 200", async () => {
  const response = await fetch("http://localhost:3000/api/v1/status");

  expect(response.status).toBe(200);

  const body = await response.json();
  const parsed = new Date(body.updated_at).toISOString();
  expect(body.updated_at).toEqual(parsed);

  expect(body.dependencies.postgres_version).toBe("16.0");
  expect(typeof body.dependencies.postgres_version).toBe("string");

  expect(body.dependencies.used_connections).toBe(1);
  expect(typeof body.dependencies.used_connections).toBe("number");

  expect(body.dependencies.max_connections).toBe(100);
  expect(typeof body.dependencies.max_connections).toBe("number");
});
