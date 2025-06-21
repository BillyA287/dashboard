'use client';

import { useEffect, useState } from 'react';
import UserTable from './UserTable';
import UserForm from './UserForm';
import Modal from './Modal';
import type { User } from '../../types/types';

export default function UserDashboard() {
  const [users, setUsers] = useState<User[]>([]);
  const [formData, setFormData] = useState<Omit<User, 'id'>>({ name: '', email: '', role: '' });
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [snackbar, setSnackbar] = useState<{ message: string; type: 'success' | 'error' } | null>(null); // Snackbar state

  useEffect(() => {
    setLoading(true);
    fetch('/api/users')
      .then(res => res.json())
      .then(data => {
        setUsers(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching users:', err);
        setLoading(false);
      });
  }, []);

  const handleSubmit = async () => {
    const method = editingId ? 'PUT' : 'POST';
    const body = editingId ? { ...formData, id: editingId } : formData;

    // Check if the user details have changed
    if (editingId) {
      const originalUser = users.find(u => u.id === editingId);
      if (
        originalUser &&
        originalUser.name === formData.name &&
        originalUser.email === formData.email &&
        originalUser.role === formData.role
      ) {
        // No changes detected, do not show snackbar or update state
        setShowModal(false);
        return;
      }
    }

    const res = await fetch('/api/users', {
      method,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer test-token', // Add the Authorization header
      },
      body: JSON.stringify(body),
    });

    if (!res.ok) {
      console.error('Failed to add/update user:', await res.text());
      return;
    }

    const user = await res.json();

    setUsers(prev => {
      if (editingId) return prev.map(u => (u.id === user.id ? user : u));
      return [...prev, user];
    });

    setFormData({ name: '', email: '', role: '' });
    setEditingId(null);
    setShowModal(false);

    // Show snackbar for add/update
    setSnackbar({
      message: editingId ? `User "${user.name}" updated successfully!` : `User "${user.name}" added successfully!`,
      type: 'success',
    });
    setTimeout(() => setSnackbar(null), 3000); // Auto-hide after 3 seconds
  };

  const handleEdit = (user: User) => {
    setFormData({ name: user.name, email: user.email, role: user.role });
    setEditingId(user.id);
    setShowModal(true);
  };

  const handleDelete = async (id: string) => {
    const userToDelete = users.find(u => u.id === id); // Find the user being deleted
    await fetch('/api/users', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer test-token', // Add the Authorization header
      },
      body: JSON.stringify({ id }),
    });

    setUsers(prev => prev.filter(u => u.id !== id));

    // Show snackbar for delete
    if (userToDelete) {
      setSnackbar({
        message: `User "${userToDelete.name}" deleted successfully!`,
        type: 'error',
      });
      setTimeout(() => setSnackbar(null), 3000); // Auto-hide after 3 seconds
    }
  };

  const handleAdd = () => {
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
            snackbar.type === 'success' ? 'bg-green-600 text-white' : 'bg-red-600 text-white'
          }`}
        >
          {snackbar.message}
        </div>
      )}
    </div>
  );
}