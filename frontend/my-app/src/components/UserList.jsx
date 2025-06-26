import React, { useState, useEffect } from "react";
import { getAllUsers } from "../services/api";

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        console.log("Fetching users from API...");
        const userData = await getAllUsers();
        console.log("Received user data:", userData);
        setUsers(userData);
        setLoading(false);
      } catch (err) {
        console.error("Error details:", err);
        setError(`Failed to fetch users: ${err.message}`);
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  // Define the onEditUser function
  const onEditUser = (userId) => {
    console.log(`Editing user with ID: ${userId}`);
    // Add your edit user logic here
    // For example, you could navigate to an edit page:
    // history.push(`/users/edit/${userId}`);
    // Or you could set a state to show an edit form
  };

  if (loading) return <div>Loading users...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="user-list">
      <h2>Users</h2>
      {users.length === 0 ? (
        <p>No users found</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>
                  <button onClick={() => onEditUser(user.id)}>Edit</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default UserList;
