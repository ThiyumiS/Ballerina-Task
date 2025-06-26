import React, { useState, useEffect } from "react";
import { getAllUsers, getUserById } from "../services/api";
import DeleteUserForm from "./DeleteUserForm";
import "./UserList.css";

// Add the onEditUser prop here
const UserList = ({ onEditUser }) => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userToDelete, setUserToDelete] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const userData = await getAllUsers();
      setUsers(userData);
      setError(null);
    } catch (err) {
      console.error("Error details:", err);
      setError(`Failed to fetch users: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  // Get user by ID
  const handleViewUser = async (userId) => {
    try {
      setLoading(true);
      const user = await getUserById(userId);
      setSelectedUser(user);
      setError(null);
    } catch (err) {
      console.error(`Error fetching user ${userId}:`, err);
      setError(`Failed to fetch user details: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  // Handle edit button click
  const handleEditClick = (userId) => {
    if (onEditUser) {
      onEditUser(userId);
    } else {
      console.log(`Edit function not provided for user ${userId}`);
    }
  };

  // Handle delete button click
  const handleDeleteClick = (user) => {
    setUserToDelete(user);
  };

  // Handle delete success
  const handleDeleteSuccess = () => {
    setUserToDelete(null);
    fetchUsers(); // Refresh the list after successful deletion
  };

  // Cancel delete operation
  const handleCancelDelete = () => {
    setUserToDelete(null);
  };

  // Close user details modal
  const handleCloseUserDetails = () => {
    setSelectedUser(null);
  };

  // Remove the unused onRefresh and onEditUser functions

  if (loading) return <div>Loading users...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="user-list">
      <h2>User List</h2>

      {/* User delete confirmation dialog */}
      {userToDelete && (
        <DeleteUserForm
          userId={userToDelete.id}
          userName={userToDelete.name}
          onDeleteSuccess={handleDeleteSuccess}
          onCancel={handleCancelDelete}
        />
      )}

      {/* User details modal */}
      {selectedUser && (
        <div className="user-details">
          <h3>User Details</h3>
          <p>
            <strong>ID:</strong> {selectedUser.id}
          </p>
          <p>
            <strong>Name:</strong> {selectedUser.name}
          </p>
          <p>
            <strong>Email:</strong> {selectedUser.email}
          </p>
          <button onClick={handleCloseUserDetails}>Close</button>
        </div>
      )}

      {/* Refresh button */}
      <button className="refresh-button" onClick={fetchUsers}>
        Refresh Users
      </button>

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
                <td className="action-buttons">
                  <button
                    className="view-button"
                    onClick={() => handleViewUser(user.id)}
                  >
                    View
                  </button>
                  <button
                    className="edit-button"
                    onClick={() => handleEditClick(user.id)}
                  >
                    Edit
                  </button>
                  <button
                    className="delete-button"
                    onClick={() => handleDeleteClick(user)}
                  >
                    Delete
                  </button>
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
