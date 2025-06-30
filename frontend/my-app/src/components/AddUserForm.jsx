import React, { useState } from "react";
import { addUser } from "../services/api";
import "./AddUserForm.css";

function AddUserForm({ onUserAdded }) {
  // 1. Setup state for name and email
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [error, setError] = useState(null);

  // 2. Create submit handler function
  const handleSubmit = async (e) => {
    e.preventDefault();

    setIsSubmitting(true);
    setError(null);
    setSuccessMessage("");

    try {
      // Call API to add user
      await addUser(name, email);

      // Show success message
      setSuccessMessage(`User "${name}" was added successfully!`);

      // Reset form
      setName("");
      setEmail("");

      // Notify parent component if needed
      if (onUserAdded) {
        onUserAdded();
      }

      // // Clear success message after 5 seconds
      setTimeout(() => {
        setSuccessMessage("");
      }, 5000);
    } catch (err) {
      console.error("Failed to add user:", err);
      setError(`Failed to add user: ${err.message}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  // 3. Create input fields with value and onChange
  // 4. Add submit button that triggers the handler
  return (
    <form onSubmit={handleSubmit}>
      <h2>Add User Form</h2>

      {/* Success message */}
      {successMessage && (
        <div className="success-message">{successMessage}</div>
      )}

      {/* Error message */}
      {error && <div className="error-message">{error}</div>}

      <div className="form-group">
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          disabled={isSubmitting}
        />
      </div>

      <div className="form-group">
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          disabled={isSubmitting}
        />
      </div>

      <button type="submit" disabled={isSubmitting} className="submit-button">
        {isSubmitting ? "Adding..." : "Add User"}
      </button>
    </form>
  );
}
export default AddUserForm;
