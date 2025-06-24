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

  if (loading) return <div>Loading users...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="user-list">
      <h2>Users</h2>
      {users.length === 0 ? (
        <p>No users found</p>
      ) : (
        <ul>
          {users.map((user, index) => (
            <li key={index}>{JSON.stringify(user)}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default UserList;
