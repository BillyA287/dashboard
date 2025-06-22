import React from 'react';
import UserRow from './_UserRow/userRow'; // Import the modularized UserRow component
import type { UserTableProps } from '../../../types/types';

const UserTable: React.FC<UserTableProps> = ({ users, onEdit, onDelete, onSort, sortKey, sortOrder, loading }) => {
  return (
    <div className="overflow-x-auto border rounded-lg shadow-md">
      <table className="min-w-full bg-white">
        <thead className="bg-gray-100">
          <tr>
            <th
              className={`py-2 px-4 text-left font-medium cursor-pointer ${
                sortKey === 'name' ? 'bg-blue-100 text-blue-700' : 'text-gray-700 hover:text-gray-900'
              }`}
              onClick={() => onSort('name')}
              title="Click to sort by Name"
            >
              Name {sortKey === 'name' && (sortOrder === 'asc' ? '↑ Sort Asc' : '↓ Sort Desc')}
            </th>
            <th
              className={`py-2 px-4 text-left font-medium cursor-pointer ${
                sortKey === 'email' ? 'bg-blue-100 text-blue-700' : 'text-gray-700 hover:text-gray-900'
              }`}
              onClick={() => onSort('email')}
              title="Click to sort by Email"
            >
              Email {sortKey === 'email' && (sortOrder === 'asc' ? '↑ Sort Asc' : '↓ Sort Desc')}
            </th>
            <th
              className={`py-2 px-4 text-left font-medium cursor-pointer ${
                sortKey === 'role' ? 'bg-blue-100 text-blue-700' : 'text-gray-700 hover:text-gray-900'
              }`}
              onClick={() => onSort('role')}
              title="Click to sort by Role"
            >
              Role {sortKey === 'role' && (sortOrder === 'asc' ? '↑ Sort Asc' : '↓ Sort Desc')}
            </th>
            <th className="py-2 px-4 text-left font-medium text-gray-700">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <UserRow key={user.id} user={user} onEdit={onEdit} onDelete={() => onDelete(user)} loading={loading} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserTable;