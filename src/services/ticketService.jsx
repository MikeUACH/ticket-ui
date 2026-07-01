export async function createTicket(data) {
  const response = await fetch("http://localhost:8080/api/tickets", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  });

  return response.json();
}