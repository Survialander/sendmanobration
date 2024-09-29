export default function status(request, response) {
  response.status(200).json({
    chave: "teste api no next",
  });
}
