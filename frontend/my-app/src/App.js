import React from "react";
import "./App.css";
import UserList from "./components/UserList";
import AddUserForm from "./components/AddUserForm";
import UpdateUserForm from "./components/UpdateUserForm";

function App() {
  return (
    <div className="app-container">
      <h1>User Management</h1>
      <AddUserForm />
      <UserList />
      <UpdateUserForm />
    </div>
  );
}
export default App;
