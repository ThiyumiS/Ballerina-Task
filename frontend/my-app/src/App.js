import React, { useState } from "react";
import "./App.css";
import UserList from "./components/UserList";
import AddUserForm from "./components/AddUserForm";
import UpdateUserForm from "./components/UpdateUserForm";
// Remove this import since DeleteUserForm is used inside UserList
// import DeleteUserForm from "./components/DeleteUserForm";

function App() {
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  // Handler for when a user is successfully added
  const handleUserAdded = () => {
    console.log("User was added successfully");
    // Refresh the user list or perform other actions
    setRefreshTrigger((prev) => prev + 1);
  };

  // Handler for when a user is selected for editing
  const handleEditUser = (userId) => {
    setSelectedUserId(userId);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Handler to cancel editing
  const handleCancelUpdate = () => {
    setSelectedUserId(null);
  };

  // Handler for when a user is successfully updated or added
  const handleUserUpdated = () => {
    setRefreshTrigger((prev) => prev + 1);
    setTimeout(() => setSelectedUserId(null), 2000);
  };

  return (
    <div className="app-container">
      <h1>User Management</h1>

      {selectedUserId ? (
        <UpdateUserForm
          userId={selectedUserId}
          onUpdateSuccess={handleUserUpdated}
          onCancel={handleCancelUpdate}
        />
      ) : (
        <AddUserForm onUserAdded={handleUserAdded} />
      )}

      <UserList key={refreshTrigger} onEditUser={handleEditUser} />

      {/* Remove this section as it's already handled inside UserList */}

      <footer>
        <p>© 2023 User Management App</p>
      </footer>
    </div>
  );
}
export default App;
