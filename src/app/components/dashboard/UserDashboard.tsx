'use client';

import { useState } from 'react';
import UserTable from './userTable';
import UserForm from './userForm';
import Modal from './modal';
import { useUsers } from '../../hooks/useUsers';
import { useSnackbar } from '../../hooks/useSnackbar';
import type { User } from '../../types/types';

export default function UserDashboard() {
  const { users, setUsers, loading } = useUsers(); // Use the custom hook for fetching users
  const { snackbar, showSnackbar } = useSnackbar(); // Use the custom hook for snackbar notifications
  const [formData, setFormData] = useState<Omit<User, 'id'>>({ name: '', email: '', role: '' });
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showModal, setShowModal] = useState<boolean>(false);

  const handleSubmit = async (): Promise<void> => {
    const method: 'PUT' | 'POST' = editingId ? 'PUT' : 'POST';
    const endpoint = editingId ? `/api/users/${editingId}` : '/api/users'; // Use the correct endpoint
    const body: User | Omit<User, 'id'> = editingId ? { ...formData, id: editingId } : formData;

    // Check if the user details have changed
    if (editingId) {
      const originalUser: User | undefined = users.find((u: User) => u.id === editingId);
      if (
        originalUser &&
        originalUser.name === formData.name &&
        originalUser.email === formData.email &&
        originalUser.role === formData.role
      ) {
        // No changes detected
        setShowModal(false);
        showSnackbar(`No changes made to user "${originalUser.name}".`, 'info'); // Teal blue for no changes
        return;
      }
    }

    const res: Response = await fetch(endpoint, {
      method,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer test-token', // Add the Authorization header
      },
      body: JSON.stringify(body),
    });

    if (!res.ok) {
      console.error('Failed to add/update user:', await res.text());
      showSnackbar('Failed to add/update user', 'error');
      return;
    }

    const user: User = await res.json();

    setUsers((prev: User[]) => {
      if (editingId) return prev.map((u: User) => (u.id === user.id ? user : u));
      return [...prev, user];
    });

    setFormData({ name: '', email: '', role: '' });
    setEditingId(null);
    setShowModal(false);

    // Show snackbar based on operation
    if (!editingId) {
      showSnackbar(`User "${user.name}" added successfully!`, 'success'); // Green for add
    } else {
      showSnackbar(`User "${user.name}" updated successfully!`, 'info'); // Teal blue for update
    }
  };

  const handleEdit = (user: User): void => {
    setFormData({ name: user.name, email: user.email, role: user.role });
    setEditingId(user.id);
    setShowModal(true);
  };

  const handleDelete = async (id: string): Promise<void> => {
    const userToDelete: User | undefined = users.find((u: User) => u.id === id); // Find the user being deleted
    const res: Response = await fetch(`/api/users/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer test-token', // Add the Authorization header
      },
    });

    if (!res.ok) {
      console.error('Failed to delete user:', await res.text());
      showSnackbar('Failed to delete user', 'error');
      return;
    }

    setUsers((prev: User[]) => prev.filter((u: User) => u.id !== id));

    if (userToDelete) {
      showSnackbar(`User "${userToDelete.name}" deleted successfully!`, 'error'); // Red for delete
    }
  };

  const handleAdd = (): void => {
    setFormData({ name: '', email: '', role: '' });
    setEditingId(null);
    setShowModal(true);
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">User Management Dashboard</h1>
      <button onClick={handleAdd} className="mb-4 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
        Add User
      </button>

      {loading ? (
        <p className="text-gray-500 text-center mt-4">Loading users...</p>
      ) : users.length > 0 ? (
        <UserTable users={users} onEdit={handleEdit} onDelete={handleDelete} />
      ) : (
        <p className="text-gray-500 text-center mt-4">
          No users present. Please select &quot;Add User&quot; to create a new user.
        </p>
      )}

      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <UserForm
            formData={formData}
            setFormData={setFormData}
            onSubmit={handleSubmit}
            editing={!!editingId}
          />
        </Modal>
      )}

      {/* Snackbar */}
      {snackbar && (
        <div
          className={`fixed bottom-4 left-1/2 transform -translate-x-1/2 px-4 py-2 rounded shadow-md ${
            snackbar.type === 'success'
              ? 'bg-green-600 text-white'
              : snackbar.type === 'info'
              ? 'bg-teal-500 text-white'
              : 'bg-red-600 text-white'
          }`}
        >
          {snackbar.message}
        </div>
      )}
    </div>
  );
}