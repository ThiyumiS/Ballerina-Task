const API_BASE = "http://localhost:8080";

export async function getAllUsers() {
  try {
    const res = await fetch(`${API_BASE}/users`);

    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }

    return await res.json();
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error;
  }
}
