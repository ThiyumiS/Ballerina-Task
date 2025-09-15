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
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
//           <div className="bg-white p-6 rounded-lg max-w-lg w-full">
//             <h2 className="text-2xl font-bold mb-4">User Details</h2>
//             <div className="user-details mb-4">
//               <p>
//                 <strong>ID:</strong> {userToView.id}
//               </p>
//               <p>
//                 <strong>Name:</strong> {userToView.name}
//               </p>
//               <p>
//                 <strong>Email:</strong> {userToView.email}
//               </p>
//               <p>
//                 <strong>Role:</strong> {userToView.role}
//               </p>
//             </div>
//             <button
//               className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded"
//               onClick={() => setUserToView(null)}
//             >
//               Close
//             </button>
//           </div>
//         </div>
//       )}

//       {/* Delete User Modal - Only shows when a user is selected for deletion */}
//       {userToDelete && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
//           <div className="bg-white p-6 rounded-lg max-w-lg w-full">
//             <DeleteUserForm
//               userId={userToDelete.id}
//               userName={userToDelete.name}
//               onDeleteSuccess={handleDeleteSuccess}
//               onCancel={() => setUserToDelete(null)}
//             />
//           </div>
//         </div>
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

import AddUserForm from "./components/AddUserForm";
import UserList from "./components/UserList";
import UpdateUserForm from "./components/UpdateUserForm";
import DeleteUserForm from "./components/DeleteUserForm";
import LoginPage from "./components/LoginPage";
import { getAllUsers } from "./services/api";

// NEW: tiny auth helper that reads your token
function isAuthed() {
  return !!localStorage.getItem("token");
}

// NEW: route guard for protected pages
function PrivateRoute({ children }) {
  return isAuthed() ? children : <Navigate to="/login" replace />;
}

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
  if (loading && !isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-orange-500 mx-auto"></div>
          <p className="mt-4 text-gray-600 text-lg">Loading...</p>
        </div>
      </div>
    );
  }

  // Show login page if not authenticated
  if (!isAuthenticated) {
    return <LoginPage onLogin={handleLogin} />;
  }

  // Show main app if authenticated
  return (

    // NEW: wrap your app with BrowserRouter
    <BrowserRouter>
      {/* NEW: declare routes */}
      <Routes>
        {/* Public route: Login */}
        <Route path="/login" element={<LoginPage onLogin={handleLogin} />} />

        {/* Protected route: Dashboard/Home */}
        <Route
          path="/"
          element={
            <PrivateRoute>
              <>
                {/* Header with user info and logout */}
                <header className="bg-white shadow-sm border-b border-gray-200">
                  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center py-4">
                      <div className="flex items-center">
                        <div className="w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center mr-3">
                          <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <h1 className="text-2xl font-bold text-gray-900">
                          User Management System
                        </h1>
                      </div>
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center">
                            <span className="text-orange-600 font-medium text-sm">
                              {currentUser?.name?.charAt(0)?.toUpperCase() || 'U'}
                            </span>
                          </div>
                          <div className="text-sm">
                            <p className="text-gray-900 font-medium">
                              {currentUser?.name || 'User'}
                            </p>
                            <p className="text-gray-500">
                              {currentUser?.email}
                            </p>
                          </div>
                        </div>
                        <button
                          onClick={handleLogout}
                          className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg font-medium transition-colors flex items-center space-x-2"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                          </svg>
                          <span>Logout</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </header>

                {/* Main Content */}
                <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                  {/* Add User Form */}
                  <div className="mb-8">
                    <AddUserForm onUserAdded={handleUserAdded} />
                  </div>

                  {/* User List with loading state */}
                  {loading ? (
                    <div className="text-center py-12">
                      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto"></div>
                      <p className="mt-4 text-gray-600">Loading users...</p>
                    </div>
                  ) : error ? (
                    <div className="text-center py-12">
                      <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md mx-auto">
                        <svg className="w-12 h-12 text-red-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
                        </svg>
                        <p className="text-red-600 font-medium">{error}</p>
                        <button
                          onClick={() => window.location.reload()}
                          className="mt-3 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg text-sm font-medium transition-colors"
                        >
                          Try Again
                        </button>
                      </div>
                    </div>
                  ) : (
                    <UserList
                      users={users}
                      onEdit={handleEdit}
                      onDelete={handleDelete}
                      onView={handleView}
                    />
                  )}
                </main>

                {/* Modals */}
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
                  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-xl shadow-xl max-w-lg w-full">
                      <div className="p-6">
                        <div className="flex items-center justify-between mb-6">
                          <h2 className="text-2xl font-bold text-gray-900">User Details</h2>
                          <button
                            onClick={() => setUserToView(null)}
                            className="text-gray-400 hover:text-gray-600 transition-colors"
                          >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                          </button>
                        </div>
                        
                        <div className="space-y-4">
                          <div className="flex items-center space-x-3">
                            <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                              <span className="text-orange-600 font-semibold">
                                {userToView.name?.charAt(0)?.toUpperCase() || 'U'}
                              </span>
                            </div>
                            <div>
                              <p className="text-lg font-semibold text-gray-900">
                                {userToView.name}
                              </p>
                              <p className="text-gray-500">
                                ID: {userToView.id}
                              </p>
                            </div>
                          </div>
                          
                          <div className="bg-gray-50 rounded-lg p-4">
                            <div className="grid grid-cols-1 gap-3">
                              <div>
                                <label className="text-sm font-medium text-gray-500">Email</label>
                                <p className="text-gray-900">{userToView.email}</p>
                              </div>
                              <div>
                                <label className="text-sm font-medium text-gray-500">Role</label>
                                <p className="text-gray-900">{userToView.role || 'User'}</p>
                              </div>
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex justify-end mt-6">
                          <button
                            onClick={() => setUserToView(null)}
                            className="px-6 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded-lg font-medium transition-colors"
                          >
                            Close
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Delete User Modal */}
                {userToDelete && (
                  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-xl shadow-xl max-w-lg w-full">
                      <div className="p-6">
                        <DeleteUserForm
                          userId={userToDelete.id}
                          userName={userToDelete.name}
                          onDeleteSuccess={handleDeleteSuccess}
                          onCancel={() => setUserToDelete(null)}
                        />
                      </div>
                    </div>
                  </div>
                )}
              </>
            </PrivateRoute>
          }
        />

        {/* NEW: Catch-all → go home (will bounce to /login if not authed) */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

