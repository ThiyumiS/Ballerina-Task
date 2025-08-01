import { useState, useEffect } from "react";
import { updateUser, getUserById } from "../services/api";

function UpdateUserForm({ userId, onUpdateSuccess, onCancel }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [updateMessage, setUpdateMessage] = useState("");

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
      if (onUpdateSuccess) onUpdateSuccess();
    } catch (err) {
      console.error("Failed to update user:", err);
      setError("Failed to update user. Please try again.");
    }
  };

  if (loading)
    return <p className="text-gray-600 text-center">Loading user data...</p>;

  if (error)
    return (
      <p className="text-red-700 bg-red-100 border border-red-300 p-4 rounded-md text-center">
        {error}
      </p>
    );

  return (
    <div className="max-w-xl mx-auto bg-white p-6 rounded-xl shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Update User</h2>

      {updateMessage && (
        <div className="mb-4 text-green-700 bg-green-100 p-3 rounded-md border border-green-300">
          {updateMessage}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label
            htmlFor="user-id"
            className="block text-sm font-medium text-gray-700"
          >
            User ID
          </label>
          <p id="user-id" className="text-gray-900 font-medium mt-1">
            {userId}
          </p>
        </div>

        <div className="mb-4">
          <label
            htmlFor="update-name"
            className="block text-sm font-medium text-gray-700"
          >
            Full Name
          </label>
          <input
            type="text"
            id="update-name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            data-testid="name-input"
            className="w-full border border-gray-300 rounded-md px-4 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
        </div>

        <div className="mb-6">
          <label
            htmlFor="update-email"
            className="block text-sm font-medium text-gray-700"
          >
            Email
          </label>
          <input
            type="email"
            id="update-email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            data-testid="email-input"
            className="w-full border border-gray-300 rounded-md px-4 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
        </div>

        <div className="flex justify-end gap-3">
          <button
            type="submit"
            className="bg-orange-500 hover:bg-orange-600 text-white font-semibold px-5 py-2 rounded-md"
            data-testid="submit-btn"
          >
            Update User
          </button>
          {onCancel && (
            <button
              type="button"
              onClick={onCancel}
              className="px-5 py-2 rounded-md border border-gray-300 text-gray-700 hover:bg-gray-100"
            >
              Cancel
            </button>
          )}
        </div>
      </form>
    </div>
  );
}

export default UpdateUserForm;

// import { useState, useEffect } from "react";
// import { updateUser, getUserById } from "../services/api";

// function UpdateUserForm({ userId, onUpdateSuccess, onCancel }) {
//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [updateMessage, setUpdateMessage] = useState("");

//   useEffect(() => {
//     const fetchUser = async () => {
//       if (!userId) {
//         setLoading(false);
//         return;
//       }

//       try {
//         setLoading(true);
//         const userData = await getUserById(userId);
//         setName(userData.name);
//         setEmail(userData.email);
//         setError(null);
//       } catch (err) {
//         console.error("Error fetching user:", err);
//         setError("Failed to load user data");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchUser();
//   }, [userId]);

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!userId) {
//       setError("No user selected for update");
//       return;
//     }

//     try {
//       setUpdateMessage("");
//       await updateUser(userId, { name, email });
//       setUpdateMessage("User updated successfully!");
//       if (onUpdateSuccess) onUpdateSuccess();
//     } catch (err) {
//       console.error("Failed to update user:", err);
//       setError("Failed to update user. Please try again.");
//     }
//   };

//   if (loading)
//     return <p className="text-gray-600 text-center">Loading user data...</p>;

//   if (error)
//     return (
//       <p className="text-red-700 bg-red-100 border border-red-300 p-4 rounded-md text-center">
//         {error}
//       </p>
//     );

//   return (
//     <div className="max-w-xl mx-auto bg-white p-6 rounded-xl shadow-md">
//       <h2 className="text-2xl font-bold mb-4 text-gray-800">Update User</h2>

//       {updateMessage && (
//         <div className="mb-4 text-green-700 bg-green-100 p-3 rounded-md border border-green-300">
//           {updateMessage}
//         </div>
//       )}

//       <form onSubmit={handleSubmit}>
//         <div className="mb-4">
//           <label
//             htmlFor="user-id"
//             className="block text-sm font-medium text-gray-700"
//           >
//             User ID
//           </label>
//           <p id="user-id" className="text-gray-900 font-medium mt-1">
//             {userId}
//           </p>
//         </div>

//         <div className="mb-4">
//           <label
//             htmlFor="update-name"
//             className="block text-sm font-medium text-gray-700"
//           >
//             Full Name
//           </label>
//           <input
//             type="text"
//             id="update-name"
//             value={name}
//             onChange={(e) => setName(e.target.value)}
//             required
//             data-testid="name-input"
//             className="w-full border border-gray-300 rounded-md px-4 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-orange-500"
//           />
//         </div>

//         <div className="mb-6">
//           <label
//             htmlFor="update-email"
//             className="block text-sm font-medium text-gray-700"
//           >
//             Email
//           </label>
//           <input
//             type="email"
//             id="update-email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             required
//             data-testid="email-input"
//             className="w-full border border-gray-300 rounded-md px-4 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-orange-500"
//           />
//         </div>

//         <div className="flex justify-end gap-3">
//           <button
//             type="submit"
//             className="bg-orange-500 hover:bg-orange-600 text-white font-semibold px-5 py-2 rounded-md"
//             data-testid="submit-btn"
//           >
//             Update User
//           </button>
//           {onCancel && (
//             <button
//               type="button"
//               onClick={onCancel}
//               className="px-5 py-2 rounded-md border border-gray-300 text-gray-700 hover:bg-gray-100"
//             >
//               Cancel
//             </button>
//           )}
//         </div>
//       </form>
//     </div>
//   );
// }

// export default UpdateUserForm;
