import React from "react";

const UserTable = ({ users, onEdit, onDelete }) => {
  return (
    <table className="min-w-full bg-white shadow-md rounded overflow-hidden">
      <thead className="bg-gray-200 text-gray-700">
        <tr>
          <th className="py-3 px-6 text-left">Name</th>
          <th className="py-3 px-6 text-left">Email</th>
          <th className="py-3 px-6 text-center w-40">Actions</th>
        </tr>
      </thead>
      <tbody>
        {users.length === 0 && (
          <tr>
            <td colSpan={3} className="text-center py-4 text-gray-500">
              No users found.
            </td>
          </tr>
        )}
        {users.map((user) => (
          <tr key={user.id} className="border-b hover:bg-gray-50">
            <td className="py-3 px-6">{user.name}</td>
            <td className="py-3 px-6">{user.email}</td>
            <td className="py-3 px-6 text-center space-x-2 flex">
              <button
                onClick={() => onEdit(user)}
                className="px-3 py-1 bg-yellow-400 hover:bg-yellow-500 rounded text-white"
              >
                Edit
              </button>
              <button
                onClick={() => onDelete(user.id)}
                className="px-3 py-1 bg-red-500 hover:bg-red-600 rounded text-white"
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default UserTable;
