import { useState } from "react";
import { addUser } from "../services/api";
import "./AddUserForm.css";

function AddUserForm() {
  // 1. Setup state for name and email
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  // 2. Create submit handler function
  const handleSubmit = async (e) => {
    e.preventDefault();
    // Add code to submit the user to your API
    console.log("Submitting user:", { name, email });
    // Reset form after submission
    setName("");
    setEmail("");

    try {
      await addUser(name, email);
      console.log("User added successfully!");
      setName("");
      setEmail("");
    } catch (err) {
      console.error("Failed to add user:", err);
    }
  };

  // 3. Create input fields with value and onChange
  // 4. Add submit button that triggers the handler
  return (
    <form onSubmit={handleSubmit}>
      <h2>Add User Form</h2>
      <div>
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <button type="submit">Add User</button>
    </form>
  );
}
export default AddUserForm;
