import React from 'react';
import type { User } from '../../../../types/types';

interface UserRowProps {
  user: User;
  onEdit: (user: User) => void;
  onDelete: (id: string) => void;
  loading: boolean; // Add loading prop
}

const UserRow: React.FC<UserRowProps> = ({ user, onEdit, onDelete, loading }) => (
  <tr className="hover:bg-gray-50">
    <td className="py-2 px-4 text-gray-900">{user.name}</td>
    <td className="py-2 px-4 text-gray-900">{user.email}</td>
    <td className="py-2 px-4 text-gray-900">{user.role}</td>
    <td className="py-2 px-4">
      <div className="flex flex-row space-x-4">
        <button
          className={`flex items-center text-blue-500 no-underline transition-transform transform hover:scale-105 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
          onClick={() => onEdit(user)}
          disabled={loading} // Disable button during loading
        >
          ✏️ Edit
        </button>
        <button
          className={`flex items-center text-red-500 no-underline transition-transform transform hover:scale-105 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
          onClick={() => onDelete(user.id)}
          disabled={loading} // Disable button during loading
        >
          🗑️ Delete
        </button>
      </div>
    </td>
  </tr>
);

export default UserRow;