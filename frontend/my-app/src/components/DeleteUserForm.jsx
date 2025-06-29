import React, { useState } from "react";
import { deleteUser } from "../services/api";
import "./DeleteUserForm.css";

function DeleteUserForm({ userId, userName, onDeleteSuccess, onCancel }) {
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");

  const handleDelete = async () => {
    if (!userId) return;

    try {
      setIsDeleting(true);
      setError(null);
      setSuccessMessage("");

      await deleteUser(userId);

      // Show success message
      setSuccessMessage(`User ${userName || userId} was successfully deleted!`);

      // Call the onDeleteSuccess callback after a short delay to allow user to see the success message
      setTimeout(() => {
        if (onDeleteSuccess) {
          onDeleteSuccess();
        }
      }, 1500); // 1.5 second delay
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

      {successMessage && (
        <div className="success-message">{successMessage}</div>
      )}

      {!successMessage ? (
        <>
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
        </>
      ) : (
        <button className="ok-button" onClick={onDeleteSuccess}>
          OK
        </button>
      )}
    </div>
  );
}

export default DeleteUserForm;
