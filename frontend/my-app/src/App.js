// import React, { useState } from "react";
// import "./App.css";
// import UserList from "./components/UserList";
// import AddUserForm from "./components/AddUserForm";
// import UpdateUserForm from "./components/UpdateUserForm";
// // Remove this import since DeleteUserForm is used inside UserList
// //import DeleteUserForm from "./components/DeleteUserForm";

// function App() {
//   const [selectedUserId, setSelectedUserId] = useState(null);
//   const [refreshTrigger, setRefreshTrigger] = useState(0);

//   // Handler for when a user is successfully added
//   const handleUserAdded = () => {
//     console.log("User was added successfully");
//     // Refresh the user list or perform other actions
//     setRefreshTrigger((prev) => prev + 1);
//   };

//   // Handler for when a user is selected for editing
//   const handleEditUser = (userId) => {
//     setSelectedUserId(userId);
//     window.scrollTo({ top: 0, behavior: "smooth" });
//   };

//   // Handler to cancel editing
//   const handleCancelUpdate = () => {
//     setSelectedUserId(null);
//   };

//   // Handler for when a user is successfully updated or added
//   const handleUserUpdated = () => {
//     setRefreshTrigger((prev) => prev + 1);
//     setTimeout(() => setSelectedUserId(null), 2000);
//   };

//   return (
//     <div className="app-container">
//       <h1>User Management</h1>

//       {selectedUserId ? (
//         <UpdateUserForm
//           userId={selectedUserId}
//           onUpdateSuccess={handleUserUpdated}
//           onCancel={handleCancelUpdate}
//         />
//       ) : (
//         <AddUserForm onUserAdded={handleUserAdded} />
//       )}

//       <UserList key={refreshTrigger} onEditUser={handleEditUser} />

//       {/* Remove this section as it's already handled inside UserList */}

//       <footer>
//         <p>© 2025 User Management App</p>
//       </footer>
//     </div>
//   );
// }
// export default App;

import React, { useState, useEffect } from "react";
import "./App.css"; // Add this line
import AddUserForm from "./components/AddUserForm";
import UserList from "./components/UserList";
import UpdateUserForm from "./components/UpdateUserForm";
import DeleteUserForm from "./components/DeleteUserForm";
import { getAllUsers } from "./services/api";

function App() {
  const [users, setUsers] = useState([]);
  const [userToView, setUserToView] = useState(null);
  const [userToEdit, setUserToEdit] = useState(null);
  const [userToDelete, setUserToDelete] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getUsers = async () => {
      try {
        setLoading(true);
        const data = await getAllUsers();
        setUsers(data);
        setError(null);
      } catch (err) {
        console.error("Error fetching users:", err);
        setError("Failed to load users");
      } finally {
        setLoading(false);
      }
    };

    getUsers();
  }, []);

  const handleUserAdded = () => {
    // Refresh the user list when a new user is added
    getAllUsers()
      .then((data) => setUsers(data))
      .catch((err) => console.error("Error refreshing users:", err));
  };

  const handleView = (user) => {
    setUserToView(user);
  };

  const handleEdit = (user) => {
    setUserToEdit(user);
  };

  const handleDelete = (user) => {
    setUserToDelete(user);
  };

  const handleUpdateSuccess = () => {
    setUserToEdit(null);
    // Refresh user list
    getAllUsers()
      .then((data) => setUsers(data))
      .catch((err) => console.error("Error refreshing users:", err));
  };

  const handleDeleteSuccess = () => {
    setUserToDelete(null);
    // Refresh user list
    getAllUsers()
      .then((data) => setUsers(data))
      .catch((err) => console.error("Error refreshing users:", err));
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-6">
        User Management System
      </h1>

      {/* Add User Form */}
      <AddUserForm onUserAdded={handleUserAdded} />

      {/* User List with loading state */}
      {loading ? (
        <div className="text-center py-4">Loading users...</div>
      ) : error ? (
        <div className="text-center py-4 text-red-500">{error}</div>
      ) : (
        <UserList
          users={users}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onView={handleView}
        />
      )}

      {/* Edit User Modal - Only shows when a user is selected for editing */}
      {userToEdit && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg max-w-lg w-full">
            <UpdateUserForm
              userId={userToEdit.id}
              onUpdateSuccess={handleUpdateSuccess}
              onCancel={() => setUserToEdit(null)}
            />
          </div>
        </div>
      )}

      {userToView && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg max-w-lg w-full">
            <h2 className="text-2xl font-bold mb-4">User Details</h2>
            <div className="user-details mb-4">
              <p>
                <strong>ID:</strong> {userToView.id}
              </p>
              <p>
                <strong>Name:</strong> {userToView.name}
              </p>
              <p>
                <strong>Email:</strong> {userToView.email}
              </p>
              <p>
                <strong>Role:</strong> {userToView.role}
              </p>
            </div>
            <button
              className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded"
              onClick={() => setUserToView(null)}
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Delete User Modal - Only shows when a user is selected for deletion */}
      {userToDelete && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg max-w-lg w-full">
            <DeleteUserForm
              userId={userToDelete.id}
              userName={userToDelete.name}
              onDeleteSuccess={handleDeleteSuccess}
              onCancel={() => setUserToDelete(null)}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
