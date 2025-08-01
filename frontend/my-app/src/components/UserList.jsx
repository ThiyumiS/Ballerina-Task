// import React from "react";

// const UserList = ({ users, onDeleteUser, onUpdateUser }) => {
//   return (
//     <div className="w-full">
//       <div className="overflow-x-auto bg-white rounded-lg shadow">
//         <table
//           className="min-w-full text-sm text-left text-gray-700"
//           data-testid="user-table"
//         >
//           <thead className="bg-gray-50 text-xs uppercase text-gray-500">
//             <tr>
//               <th className="px-4 py-3">Name</th>
//               <th className="px-4 py-3">Email</th>
//               <th className="px-4 py-3">Role</th>
//               <th className="px-4 py-3">Status</th>
//               <th className="px-4 py-3">Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {users.length === 0 ? (
//               <tr data-testid="no-users">
//                 <td colSpan="5" className="px-4 py-5 text-center text-gray-400">
//                   No users found.
//                 </td>
//               </tr>
//             ) : (
//               users.map((user, index) => (
//                 <tr
//                   key={index}
//                   className="border-b hover:bg-gray-50"
//                   data-testid={`user-row-${index}`}
//                 >
//                   <td className="px-4 py-3">{user.name}</td>
//                   <td className="px-4 py-3">{user.email}</td>
//                   <td className="px-4 py-3 capitalize">{user.role}</td>
//                   <td className="px-4 py-3">
//                     <span
//                       className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
//                         user.status === "Active"
//                           ? "bg-green-100 text-green-700"
//                           : user.status === "Inactive"
//                           ? "bg-red-100 text-red-700"
//                           : "bg-yellow-100 text-yellow-700"
//                       }`}
//                     >
//                       {user.status}
//                     </span>
//                   </td>
//                   <td className="px-4 py-3 space-x-2">
//                     {/* <Button
//                       onClick={() => onEdit(user)}
//                       variant="outlined"
//                       color="primary"
//                       size="small"
//                       data-testid={`edit-user-${index}`}
//                     >
//                       Edit
//                     </Button> */}

//                     {/* <Button
//                     onClick={() => onDelete(user)}
//                     variant="outlined"
//                     color="error"
//                     size="small"
//                     data-testid={`delete-user-${index}`}
//                     >
//                       Delete
//                     </Button> */}

//                     <button
//                       className="bg-orange-500 text-white px-3 py-1 rounded hover:bg-orange-600"
//                       data-testid="delete-button"
//                     >
//                       Delete
//                     </button>
//                   </td>
//                 </tr>
//               ))
//             )}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default UserList;

//////////////////------------working----------------------////////////////////////////////////

// import React, { useState } from "react";
// import DeleteUserForm from "./DeleteUserForm";
// import { getAllUsers } from "../services/api";

// import {
//   Button,
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogActions,
// } from "@mui/material";

// const UserList = ({ users, onDelete, onEdit }) => {
//   const [selectedUser, setSelectedUser] = useState(null);
//   const [isDialogOpen, setIsDialogOpen] = useState(false);

//   const handleDeleteClick = (user) => {
//     setSelectedUser(user);
//     setIsDialogOpen(true);
//   };

//   const handleDialogClose = () => {
//     setIsDialogOpen(false);
//     setSelectedUser(null);
//   };

//   const handleConfirmDelete = () => {
//     if (selectedUser) {
//       onDelete(selectedUser.id);
//       handleDialogClose();
//     }
//   };

//   return (
//     <div className="bg-white shadow-md rounded-lg p-6 mt-6">
//       <h2 className="text-2xl font-semibold mb-4">User List</h2>
//       <div className="overflow-x-auto">
//         <table className="min-w-full text-left text-sm border border-gray-200">
//           <thead className="bg-gray-100">
//             <tr>
//               <th className="p-3 border">ID</th>
//               <th className="p-3 border">Name</th>
//               <th className="p-3 border">Email</th>
//               <th className="p-3 border">Role</th>
//               <th className="p-3 border">Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {users.map((user, index) => (
//               <tr key={index} className="border-t">
//                 <td className="p-3 border">{user.id}</td>
//                 <td className="p-3 border">{user.name}</td>
//                 <td className="p-3 border">{user.email}</td>
//                 <td className="p-3 border">{user.role}</td>
//                 <td className="p-3 border space-x-2">
//                   <button
//                     onClick={() => onEdit(user)}
//                     className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
//                   >
//                     Edit
//                   </button>
//                   <button
//                     onClick={() => handleDeleteClick(user)}
//                     className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition"
//                   >
//                     Delete
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>

//       {/* MUI Dialog for Delete Confirmation */}
//       <Dialog open={isDialogOpen} onClose={handleDialogClose}>
//         <DialogTitle>Delete User</DialogTitle>
//         <DialogContent>
//           Are you sure you want to delete <strong>{selectedUser?.name}</strong>?
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={handleDialogClose}>Cancel</Button>
//           <Button onClick={handleConfirmDelete} color="error">
//             Delete
//           </Button>
//         </DialogActions>
//       </Dialog>
//     </div>
//   );
// };

// export default UserList;

import React from "react";

const UserList = ({ users = [], onDelete, onEdit, onView }) => {
  // Add default empty array
  return (
    <div className="bg-white shadow-md rounded-lg p-6 mt-6">
      <h2 className="text-2xl font-semibold mb-4">User List</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full text-left text-sm border border-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 border">ID</th>
              <th className="p-3 border">Name</th>
              <th className="p-3 border">Email</th>
              <th className="p-3 border">Role</th>
              <th className="p-3 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users && users.length > 0 ? (
              users.map((user, index) => (
                <tr key={index} className="border-t">
                  <td className="p-3 border">{user.id}</td>
                  <td className="p-3 border">{user.name}</td>
                  <td className="p-3 border">{user.email}</td>
                  <td className="p-3 border">{user.role}</td>
                  <td className="p-3 border space-x-2">
                    <button
                      onClick={() => onView(user)}
                      className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600 transition mr-2"
                      data-testid={`view-user-btn-${user.id}`}
                    >
                      View
                    </button>

                    <button
                      onClick={() => onEdit(user)}
                      className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => onDelete(user)}
                      className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="p-3 text-center">
                  No users found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserList;

//////////////////----------------------------------////////////////////////////////////
// import React, { useState, useEffect } from "react";
// import { getAllUsers } from "../services/api";
// import DeleteUserForm from "./DeleteUserForm";

// const UserList = ({ onEditUser }) => {
//   const [users, setUsers] = useState([]); // Initialize as empty array to avoid map error
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [userToDelete, setUserToDelete] = useState(null);

//   useEffect(() => {
//     const fetchUsers = async () => {
//       try {
//         const response = await getAllUsers();
//         setUsers(response);
//         setLoading(false);
//       } catch (err) {
//         console.error("Error fetching users:", err);
//         setError("Failed to fetch users");
//         setLoading(false);
//       }
//     };

//     fetchUsers();
//   }, []);

//   return (
//     <div className="p-6 bg-white shadow-md rounded-md">
//       <h2 className="text-2xl font-bold mb-4">User List</h2>

//       {loading ? (
//         <p className="text-gray-500">Loading users...</p>
//       ) : error ? (
//         <p className="text-red-500">{error}</p>
//       ) : (
//         <div className="overflow-x-auto">
//           <table
//             className="min-w-full border text-sm text-left text-gray-700"
//             data-testid="user-table"
//           >
//             <thead className="bg-gray-100 text-xs uppercase text-gray-500">
//               <tr>
//                 <th className="p-3 border">Name</th>
//                 <th className="p-3 border">Email</th>
//                 <th className="p-3 border">Role</th>
//                 <th className="p-3 border">Status</th>
//                 <th className="p-3 border">Actions</th>
//               </tr>
//             </thead>
//             <tbody>
//               {users.length === 0 ? (
//                 <tr data-testid="no-users">
//                   <td colSpan="5" className="p-4 text-center text-gray-400">
//                     No users found.
//                   </td>
//                 </tr>
//               ) : (
//                 users.map((user, index) => (
//                   <tr
//                     key={index}
//                     className="border-t hover:bg-gray-50"
//                     data-testid={`user-row-${index}`}
//                   >
//                     <td className="p-3 border">{user.name}</td>
//                     <td className="p-3 border">{user.email}</td>
//                     <td className="p-3 border capitalize">{user.role}</td>
//                     <td className="p-3 border">
//                       <span
//                         className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
//                           user.status === "Active"
//                             ? "bg-green-100 text-green-700"
//                             : user.status === "Inactive"
//                             ? "bg-red-100 text-red-700"
//                             : "bg-yellow-100 text-yellow-700"
//                         }`}
//                       >
//                         {user.status}
//                       </span>
//                     </td>
//                     <td className="p-3 border space-x-2">
//                       <button
//                         className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded transition"
//                         onClick={() => onEditUser(user)}
//                         data-testid={`edit-user-${index}`}
//                       >
//                         Edit
//                       </button>
//                       <button
//                         className="bg-orange-500 hover:bg-orange-600 text-white px-3 py-1 rounded transition"
//                         onClick={() => setUserToDelete(user)}
//                         data-testid="delete-button"
//                       >
//                         Delete
//                       </button>
//                     </td>
//                   </tr>
//                 ))
//               )}
//             </tbody>
//           </table>
//         </div>
//       )}

//       {/* Optional: Include your delete confirmation component here */}
//       {userToDelete && (
//         <DeleteUserForm
//           user={userToDelete}
//           onClose={() => setUserToDelete(null)}
//           onUserDeleted={() => {
//             setUsers(users.filter((u) => u.id !== userToDelete.id));
//             setUserToDelete(null);
//           }}
//         />
//       )}
//     </div>
//   );
// };

// export default UserList;
