import React, { useState } from "react";
import { deleteUser } from "../services/api";

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
      setSuccessMessage(`User ${userName || userId} was successfully deleted!`);

      setTimeout(() => {
        if (onDeleteSuccess) onDeleteSuccess();
      }, 1500);
    } catch (err) {
      console.error(`Error deleting user ${userId}:`, err);
      setError("Failed to delete user. Please try again.");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto bg-white p-6 rounded-xl shadow-md border border-red-300">
      <h2 className="text-2xl font-bold text-red-600 mb-4">
        Delete User</h2>

      {error && (
        <div className="mb-4 text-red-700 bg-red-100 p-3 rounded-md border border-red-300">
          {error}
        </div>
      )}

      {successMessage ? (
        <>
          <div className="mb-4 text-green-700 bg-green-100 p-3 rounded-md border border-green-300">
            {successMessage}
          </div>
          <div className="flex justify-end">
            <button
              onClick={onDeleteSuccess}
              className="px-5 py-2 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-md"
            >
              OK
            </button>
          </div>
        </>
      ) : (
        <>
          <p className="mb-2 text-gray-800">
            Are you sure you want to delete the user{" "}
            <strong>{userName || `with ID ${userId}`}</strong>?
          </p>
          <p className="mb-6 text-sm text-red-600 italic">
            This action cannot be undone!
          </p>

          <div className="flex justify-end gap-3">
            <button
              onClick={handleDelete}
              disabled={isDeleting}
              className={`px-5 py-2 rounded-md text-white font-semibold ${
                isDeleting
                  ? "bg-red-200 cursor-not-allowed"
                  : "bg-red-600 hover:bg-red-700"
              }`}
            >
              {isDeleting ? "Deleting..." : "Delete User"}
            </button>
            <button
              onClick={onCancel}
              disabled={isDeleting}
              className="px-5 py-2 rounded-md border border-gray-300 text-gray-700 hover:bg-gray-100"
            >
              Cancel
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default DeleteUserForm;
