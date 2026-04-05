// The wrong add user code//
// import React, { useState } from "react";
// import { addUser } from "../services/api";

// function AddUserForm({ onUserAdded }) {
//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [successMessage, setSuccessMessage] = useState("");
//   const [error, setError] = useState(null);

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     setIsSubmitting(true);
//     setError(null);
//     setSuccessMessage("");

//     try {
//       await addUser(name, email);
//       setSuccessMessage(`User "${name}" was added successfully!`);
//       setName("");
//       setEmail("");
//       if (onUserAdded) onUserAdded();
//       setTimeout(() => setSuccessMessage(""), 5000);
//     } catch (err) {
//       console.error("Failed to add user:", err);
//       setError(`Failed to add user: ${err.message}`);
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   return (
//     <div className="max-w-md mx-auto mt-8 bg-white p-6 rounded-xl shadow-lg border border-gray-200">
//       <h2 className="text-2xl font-bold text-gray-800 mb-6">Add New User</h2>

//       {successMessage && (
//         <div className="mb-4 p-3 text-sm text-green-800 bg-green-100 rounded-lg">
//           {successMessage}
//         </div>
//       )}

//       {error && (
//         <div className="mb-4 p-3 text-sm text-red-800 bg-red-100 rounded-lg">
//           {error}
//         </div>
//       )}

//       <form onSubmit={handleSubmit} className="space-y-4">
//         <div>
//           <label htmlFor="name" className="block font-medium mb-1">
//             Name
//           </label>
//           <input
//             id="name"
//             type="text"
//             value={name}
//             required
//             disabled={isSubmitting}
//             onChange={(e) => setName(e.target.value)}
//             data-testid="name-input"
//             className="w-full border border-gray-300 px-3 py-2 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-300"
//           />
//         </div>

//         <div>
//           <label htmlFor="email" className="block font-medium mb-1">
//             Email
//           </label>
//           <input
//             id="email"
//             type="email"
//             value={email}
//             required
//             disabled={isSubmitting}
//             onChange={(e) => setEmail(e.target.value)}
//             data-testid="email-input"
//             className="w-full border border-gray-300 px-3 py-2 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-300"
//           />
//         </div>

//         <button
//           type="submit"
//           disabled={isSubmitting}
//           className="w-full bg-orange-500 hover:bg-orange-600 text-white font-medium py-2 px-4 rounded-lg transition duration-200"
//           data-testid="submit-btn"
//         >
//           {isSubmitting ? "Adding..." : "Add User"}
//         </button>
//       </form>
//     </div>
//   );
// }

// export default AddUserForm;

import React, { useState } from "react";
import { addUser } from "../services/api";

function AddUserForm({ onUserAdded }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    setSuccessMessage("");

    try {
      await addUser(name, email);
      setSuccessMessage(`User "${name}" was added successfully!`);
      setName("");
      setEmail("");
      if (onUserAdded) onUserAdded();
      setTimeout(() => setSuccessMessage(""), 5000);
    } catch (err) {
      console.error("Failed to add user:", err);
      setError(`Failed to add user: ${err.message}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-xl mx-auto bg-white p-6 rounded-xl shadow-md"
    >
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Add New User</h2>

      {successMessage && (
        <div className="mb-4 text-green-700 bg-green-100 p-3 rounded-md border border-green-300">
          {successMessage}
        </div>
      )}

      {error && (
        <div className="mb-4 text-red-700 bg-red-100 p-3 rounded-md border border-red-300">
          {error}
        </div>
      )}

      <div className="mb-4">
        <label
          htmlFor="name"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Full Name
        </label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          disabled={isSubmitting}
          data-testid="name-input"
          className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
        />
      </div>

      <div className="mb-6">
        <label
          htmlFor="email"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Email
        </label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          disabled={isSubmitting}
          data-testid="email-input"
          className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
        />
      </div>

      <div className="flex justify-end">
        <button
          type="submit"
          disabled={isSubmitting}
          data-testid="submit-btn"
          className={`px-5 py-2 rounded-md text-white font-semibold ${
            isSubmitting
              ? "bg-orange-300 cursor-not-allowed"
              : "bg-orange-500 hover:bg-orange-600"
          }`}
        >
          {isSubmitting ? "Adding..." : "Add User"}
        </button>
      </div>
    </form>
  );
}

export default AddUserForm;
