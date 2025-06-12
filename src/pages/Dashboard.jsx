import React, { useEffect, useState } from "react";
import UserTable from "../components/UserTable";
import UserFormModal from "../components/UserFormModal";
import Pagination from "../components/Pagination";

const Dashboard = () => {
  const [users, setUsers] = useState([]); 
  const [currentPage, setCurrentPage] = useState(1);
  const [modalOpen, setModalOpen] = useState(false); 
  const [editingUser, setEditingUser] = useState(null); 
  const usersPerPage = 5; 

  // Load users from localStorage on component mount
  useEffect(() => {
    const savedUsers = JSON.parse(localStorage.getItem("users")) || [];
    setUsers(savedUsers);
  }, []);

  // Save users to localStorage whenever users array changes
  useEffect(() => {
    localStorage.setItem("users", JSON.stringify(users));
  }, [users]);

  // Add or update user with email validation
  const handleAddOrEditUser = (user) => {
    const emailExists = users.some(
      (u) =>
        u.email === user.email &&
        (editingUser || u.id == editingUser.id) // Exclude current editing user
    );

    if (emailExists) {
      alert("User with this email already exists!");
      return;
    }

    if (editingUser) {
      // Update existing user
      setUsers(
        users.map((u) =>
          u.id === editingUser.id ? { ...user, id: editingUser.id } : u
        )
      );
    } else {
      // Add new user
      const newUser = { ...user, id: Date.now() };
      setUsers([...users, newUser]);
    }

    setModalOpen(false);
    setEditingUser(null);
  };

  // Delete user by id
  const handleDeleteUser = (id) => {
    setUsers(users.filter((user) => user.id !== id));
  };

  // Open modal for editing a user
  const handleEditUser = (user) => {
    setEditingUser(user);
    setModalOpen(true);
  };

  // Pagination logic
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const paginatedUsers = users.slice(indexOfFirstUser, indexOfLastUser);

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-center mb-6">User Dashboard</h1>

      {/* Add User button */}
      <div className="flex justify-end mb-4">
        <button
          onClick={() => setModalOpen(true)}
          className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-md"
        >
          Add User
        </button>
      </div>

      {/* Users Table */}
      <UserTable
        users={paginatedUsers}
        onEdit={handleEditUser}
        onDelete={handleDeleteUser}
      />

      {/* Pagination */}
      <Pagination
        currentPage={currentPage}
        totalPages={Math.ceil(users.length / usersPerPage)}
        onPageChange={setCurrentPage}
      />

      {/* Modal for adding/editing user */}
      {modalOpen && (
        <UserFormModal
          initialData={editingUser}
          onClose={() => {
            setModalOpen(false);
            setEditingUser(null);
          }}
          onSubmit={handleAddOrEditUser}
        />
      )}
    </div>
  );
};

export default Dashboard;
