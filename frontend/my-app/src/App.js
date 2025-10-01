 /////// 1ST ONE /////////////////////////////////////////////

// import React, { useState, useEffect } from "react";
// import "./App.css"; // Add this line
// import AddUserForm from "./components/AddUserForm";
// import UserList from "./components/UserList";
// import UpdateUserForm from "./components/UpdateUserForm";
// import DeleteUserForm from "./components/DeleteUserForm";
// import { getAllUsers } from "./services/api";

// function App() {
//   const [users, setUsers] = useState([]);
//   const [userToView, setUserToView] = useState(null);
//   const [userToEdit, setUserToEdit] = useState(null);
//   const [userToDelete, setUserToDelete] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const getUsers = async () => {
//       try {
//         setLoading(true);
//         const data = await getAllUsers();
//         setUsers(data);
//         setError(null);
//       } catch (err) {
//         console.error("Error fetching users:", err);
//         setError("Failed to load users");
//       } finally {
//         setLoading(false);
//       }
//     };

//     getUsers();
//   }, []);

//   const handleUserAdded = () => {
//     // Refresh the user list when a new user is added
//     getAllUsers()
//       .then((data) => setUsers(data))
//       .catch((err) => console.error("Error refreshing users:", err));
//   };

//   const handleView = (user) => {
//     setUserToView(user);
//   };

//   const handleEdit = (user) => {
//     setUserToEdit(user);
//   };

//   const handleDelete = (user) => {
//     setUserToDelete(user);
//   };

//   const handleUpdateSuccess = () => {
//     setUserToEdit(null);
//     // Refresh user list
//     getAllUsers()
//       .then((data) => setUsers(data))
//       .catch((err) => console.error("Error refreshing users:", err));
//   };

//   const handleDeleteSuccess = () => {
//     setUserToDelete(null);
//     // Refresh user list
//     getAllUsers()
//       .then((data) => setUsers(data))
//       .catch((err) => console.error("Error refreshing users:", err));
//   };

//   return (
//     <div className="container mx-auto px-4 py-8">
//       <h1 className="text-3xl font-bold text-center mb-6">
//         User Management System
//       </h1>

//       {/* Add User Form */}
//       <AddUserForm onUserAdded={handleUserAdded} />

//       {/* User List with loading state */}
//       {loading ? (
//         <div className="text-center py-4">Loading users...</div>
//       ) : error ? (
//         <div className="text-center py-4 text-red-500">{error}</div>
//       ) : (
//         <UserList
//           users={users}
//           onEdit={handleEdit}
//           onDelete={handleDelete}
//           onView={handleView}
//         />
//       )}

//       {/* Edit User Modal - Only shows when a user is selected for editing */}
//       {userToEdit && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
//           <div className="bg-white p-6 rounded-lg max-w-lg w-full">
//             <UpdateUserForm
//               userId={userToEdit.id}
//               onUpdateSuccess={handleUpdateSuccess}
//               onCancel={() => setUserToEdit(null)}
//             />
//           </div>
//         </div>
//       )}

//       {userToView && (
        // <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
        //   <div className="bg-white p-6 rounded-lg max-w-lg w-full">
        //     <h2 className="text-2xl font-bold mb-4">User Details</h2>
        //     <div className="user-details mb-4">
        //       <p>
        //         <strong>ID:</strong> {userToView.id}
        //       </p>
        //       <p>
        //         <strong>Name:</strong> {userToView.name}
        //       </p>
        //       <p>
        //         <strong>Email:</strong> {userToView.email}
        //       </p>
        //       <p>
        //         <strong>Role:</strong> {userToView.role}
        //       </p>
        //     </div>
        //     <button
        //       className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded"
        //       onClick={() => setUserToView(null)}
        //     >
        //       Close
        //     </button>
        //   </div>
        // </div>
//       )}

//       {/* Delete User Modal - Only shows when a user is selected for deletion */}
//       {userToDelete && (
        // <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
        //   <div className="bg-white p-6 rounded-lg max-w-lg w-full">
        //     <DeleteUserForm
        //       userId={userToDelete.id}
        //       userName={userToDelete.name}
        //       onDeleteSuccess={handleDeleteSuccess}
        //       onCancel={() => setUserToDelete(null)}
        //     />
        //   </div>
        // </div>
//       )}
//     </div>
//   );
// }

// export default App;


/// ----------------------------###################----2nd one  ---######################--------------------------------------------------------//



//////////////############################////// --------------- 3rd ONE  --------------------------------///////////////////////////

import React, { useState, useEffect } from "react";
import "./App.css";
// NEW: import React Router
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// import AddUserForm from "./components/AddUserForm";
// import UserList from "./components/UserList";
import UpdateUserForm from "./components/UpdateUserForm";
import DeleteUserForm from "./components/DeleteUserForm";
import LoginPage from "./components/LoginPage";
import { getAllUsers } from "./services/api";
import Dashboard from './Dashboard/Dashboard';




function App() {
  // Authentication state
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  
  // Existing state
  const [users, setUsers] = useState([]);
  const [userToView, setUserToView] = useState(null);
  const [userToEdit, setUserToEdit] = useState(null);
  const [userToDelete, setUserToDelete] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Check for existing authentication on app load
  useEffect(() => {
    const savedAuth = localStorage.getItem('isAuthenticated');
    const savedUser = localStorage.getItem('currentUser');
    
    if (savedAuth === 'true' && savedUser) {
      setIsAuthenticated(true);
      setCurrentUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  // Load users only when authenticated
  useEffect(() => {
    if (isAuthenticated) {
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
    }
  }, [isAuthenticated]);

  // Handle login
  const handleLogin = (loginData) => {
    // In a real app, you'd validate credentials against your backend
    // For demo purposes, we'll accept any non-empty email/password
    const userData = {
      id: 1,
      email: loginData.email,
      name: loginData.name || loginData.email.split('@')[0],
      loginTime: new Date().toISOString()
    };

    setCurrentUser(userData);
    setIsAuthenticated(true);
    
    // Save to localStorage for persistence
    localStorage.setItem('isAuthenticated', 'true');
    localStorage.setItem('currentUser', JSON.stringify(userData));
  };

  // Handle logout
  const handleLogout = () => {
    setIsAuthenticated(false);
    setCurrentUser(null);
    setUsers([]);
    setUserToView(null);
    setUserToEdit(null);
    setUserToDelete(null);
    
    // Clear localStorage
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('currentUser');
  };

  // Existing handlers
  const handleUserAdded = () => {
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
    getAllUsers()
      .then((data) => setUsers(data))
      .catch((err) => console.error("Error refreshing users:", err));
  };

  const handleDeleteSuccess = () => {
    setUserToDelete(null);
    getAllUsers()
      .then((data) => setUsers(data))
      .catch((err) => console.error("Error refreshing users:", err));
  };

   // Show loading spinner while checking authentication
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-orange-500 mx-auto"></div>
          <p className="mt-4 text-gray-600 text-lg">Loading...</p>
        </div>
      </div>
    );
  }

  // Show main app if authenticated
  return (

    <BrowserRouter>
      <Routes>
        {/* Login route */}
        <Route 
          path="/login" 
          element={
            isAuthenticated ? 
              <Navigate to="/" replace /> : 
              <LoginPage onLogin={handleLogin} />
          } 
        />

        {/* Dashboard as the main/home route */}
        <Route 
          path="/" 
          element={
            isAuthenticated ? (
              <div>
                {/* Header with user info and logout */}
                <header className="bg-white shadow">
                  <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
                    <h1 className="text-2xl font-bold text-gray-900">User Management System</h1>
                    <div className="flex items-center space-x-4">
                      <span className="text-sm text-gray-600">
                        Welcome, {currentUser?.name || 'User'}
                      </span>
                      <button 
                        onClick={handleLogout}
                        className="px-3 py-2 bg-red-600 text-white rounded hover:bg-red-700 text-sm"
                      >
                        Logout
                      </button>
                    </div>
                  </div>
                </header>
                
                {/* Main Dashboard */}
                <Dashboard 
                  users={users}
                  loading={loading}
                  error={error}
                  onUserAdded={handleUserAdded}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                  onView={handleView}
                  userToEdit={userToEdit}
                  userToDelete={userToDelete}
                  userToView={userToView}
                  onUpdateSuccess={handleUpdateSuccess}
                  onDeleteSuccess={handleDeleteSuccess}
                  setUserToEdit={setUserToEdit}
                  setUserToDelete={setUserToDelete}
                  setUserToView={setUserToView}
                />
              </div>
            ) : (
              <Navigate to="/login" replace />
            )
          } 
        />

        {/* Catch-all route */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>

      {/* Modal components remain here since they're global */}
      {/* Edit User Modal */}
      {userToEdit && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-lg w-full max-h-screen overflow-y-auto">
            <div className="p-6">
              <UpdateUserForm
                userId={userToEdit.id}
                onUpdateSuccess={handleUpdateSuccess}
                onCancel={() => setUserToEdit(null)}
              />
            </div>
          </div>
        </div>
      )}

      {/* View User Modal */}
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

      {/* Delete User Modal */}
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
    </BrowserRouter>
  );
}

export default App;