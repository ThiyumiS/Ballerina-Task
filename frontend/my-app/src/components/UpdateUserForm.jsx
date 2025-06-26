import { useState, useEffect } from "react";
import { updateUser, getUserById } from "../services/api";

function UpdateUserForm({ userId, onUpdateSuccess, onCancel }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [updateMessage, setUpdateMessage] = useState("");

  // Fetch the user details when the component mounts or userId changes
  useEffect(() => {
    const fetchUser = async () => {
      if (!userId) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const userData = await getUserById(userId);
        setName(userData.name);
        setEmail(userData.email);
        setError(null);
      } catch (err) {
        console.error("Error fetching user:", err);
        setError("Failed to load user data");
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [userId]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!userId) {
      setError("No user selected for update");
      return;
    }

    try {
      setUpdateMessage("");
      await updateUser(userId, { name, email });
      setUpdateMessage("User updated successfully!");

      // Notify parent component about the successful update
      if (onUpdateSuccess) {
        onUpdateSuccess();
      }
    } catch (err) {
      console.error("Failed to update user:", err);
      setError("Failed to update user. Please try again.");
    }
  };

  if (loading) return <p>Loading user data...</p>;
  if (error) return <p className="error">{error}</p>;

  return (
    <div className="update-user-form">
      <h2>Update User</h2>
      {updateMessage && <p className="success">{updateMessage}</p>}

      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="update-name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="update-email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="button-group">
          <button type="submit" className="update-button">
            Update User
          </button>
          {onCancel && (
            <button type="button" className="cancel-button" onClick={onCancel}>
              Cancel
            </button>
          )}
        </div>
      </form>
    </div>
  );
}

export default UpdateUserForm;
