import { query } from "infra/database";

export default async function status(request, response) {
  await query("SELECT 1 + 1 as sum");

  response.status(200).json({
    chave: "teste api no next",
  });
}
