import React from "react";
import AddUserForm from "../components/AddUserForm";
import UserList from "../components/UserList";  

// dashoboard of the crud-app
const Dashboard = ({ 
  users, 
  loading, 
  error, 
  onUserAdded, 
  onEdit, 
  onDelete, 
  onView 
}) => {
  return (
    <div className="container mx-auto px-4 py-8">

      {/* Add User Form */}
      <div className="mb-8">
        <AddUserForm onUserAdded={onUserAdded} />
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
          onEdit={onEdit}
          onDelete={onDelete}
          onView={onView}
        />
      )}
    </div>
  );
};

export default Dashboard;