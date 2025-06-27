import React, { useState } from "react";
import { deleteUser } from "../services/api";
import "./DeleteUserForm.css";

function DeleteUserForm({ userId, userName, onDeleteSuccess, onCancel }) {
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState(null);

  const handleDelete = async () => {
    if (!userId) return;

    try {
      setIsDeleting(true);
      setError(null);
      await deleteUser(userId);

      // Call the onDeleteSuccess callback to notify the parent component
      if (onDeleteSuccess) {
        onDeleteSuccess();
      }
    } catch (err) {
      console.error(`Error deleting user ${userId}:`, err);
      setError("Failed to delete user. Please try again.");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="delete-user-form">
      <h2>Delete User</h2>
      {error && <div className="error-message">{error}</div>}

      <p>
        Are you sure you want to delete the user
        <strong> {userName || `with ID ${userId}`}</strong>?
      </p>
      <p className="warning">This action cannot be undone!</p>

      <div className="button-group">
        <button
          className="delete-button"
          onClick={handleDelete}
          disabled={isDeleting}
        >
          {isDeleting ? "Deleting..." : "Delete User"}
        </button>
        <button
          className="cancel-button"
          onClick={onCancel}
          disabled={isDeleting}
        >
          Cancel
        </button>
      </div>
    </div>
  );
}

export default DeleteUserForm;
