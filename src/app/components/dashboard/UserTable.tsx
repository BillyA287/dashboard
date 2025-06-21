import React from 'react';
import type { UserTableProps } from '../../types/types';

const UserTable: React.FC<UserTableProps> = ({ users, onEdit, onDelete }) => {
  return (
    <div className="overflow-x-auto border rounded-lg shadow-md">
      <table className="min-w-full bg-white">
        <thead className="bg-gray-100">
          <tr>
            <th className="py-2 px-4 text-left font-medium text-gray-700">Name</th>
            <th className="py-2 px-4 text-left font-medium text-gray-700">Email</th>
            <th className="py-2 px-4 text-left font-medium text-gray-700">Role</th>
            <th className="py-2 px-4 text-left font-medium text-gray-700">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id} className="hover:bg-gray-50">
              <td className="py-2 px-4 text-gray-900">{user.name}</td>
              <td className="py-2 px-4 text-gray-900">{user.email}</td>
              <td className="py-2 px-4 text-gray-900">{user.role}</td>
              <td className="py-2 px-4">
                <div className="flex flex-row space-x-4">
                  <button
                    className="flex items-center text-blue-500 no-underline transition-transform transform hover:scale-105"
                    onClick={() => onEdit(user)}
                  >
                    ✏️ Edit
                  </button>
                  <button
                    className="flex items-center text-red-500 no-underline transition-transform transform hover:scale-105"
                    onClick={() => onDelete(user.id)}
                  >
                    🗑️ Delete
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserTable;