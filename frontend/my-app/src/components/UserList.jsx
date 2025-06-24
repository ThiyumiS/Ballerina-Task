const API_BASE = "HTTP://localhost:8080/users"; //ballerina backend

export async function addUser(user) {
  return fetch(`${API_BASE}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(user),
  });
}

export async function getAllUsers() {
  const res = await fetch(`${API_BASE}`);
  return res.json();
}
