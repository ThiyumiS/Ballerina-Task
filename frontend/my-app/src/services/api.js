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

export async function addUser(name, email) {
  try {
    const res = await fetch(`${API_BASE}/newUsers`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email }),
    });

    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }

    return await res.json();
  } catch (error) {
    console.error("Error adding user:", error);
    throw error;
  }
}

// ...existing code...

export async function getUserById(id) {
  try {
    const res = await fetch(`${API_BASE}/users/${id}`);

    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }

    return await res.json();
  } catch (error) {
    console.error(`Error fetching user ${id}:`, error);
    throw error;
  }
}

export async function updateUser(id, userData) {
  try {
    const res = await fetch(`${API_BASE}/updateUser/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }

    return await res.json();
  } catch (error) {
    console.error(`Error updating user ${id}:`, error);
    throw error;
  }
}

export async function deleteUser(id) {
  try {
    const res = await fetch(`${API_BASE}/delUsers/${id}`, {
      method: "DELETE",
    });

    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }

    return await res.json();
  } catch (error) {
    console.error(`Error deleting user ${id}:`, error);
    throw error;
  }
}
