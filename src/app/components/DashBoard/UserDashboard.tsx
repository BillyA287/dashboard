'use client';

import { useState } from 'react';
import UserTable from './UserTable';
import UserForm from './UserForm';
import Modal from './Modal';
import Snackbar from '../SnackBar/SnackBar';
import SearchBar from '../SearchBar/SearchBar';
import { useSnackbar } from '../../hooks/useSnackbar';
import { addUser, updateUser, deleteUser } from '../../utils/api';
import type { User, UserDashboardProps } from '../../types/types';

export default function UserDashboard({ initialUsers = [] }: UserDashboardProps) {
  const [users, setUsers] = useState<User[]>(initialUsers);
  const [search, setSearch] = useState('');
  const [sortKey, setSortKey] = useState<keyof User>('name');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const { snackbar, showSnackbar } = useSnackbar();
  const [formData, setFormData] = useState<Omit<User, 'id'>>({ name: '', email: '', role: '' });
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [deletingId, setDeletingId] = useState<string | null>(null); // NEW

  const filteredUsers: User[] = users.filter(
    (u) =>
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase()) ||
      u.role.toLowerCase().includes(search.toLowerCase())
  );

  const sortedUsers: User[] = [...filteredUsers].sort((a, b) => {
    const valueA = a[sortKey].toLowerCase();
    const valueB = b[sortKey].toLowerCase();
    if (valueA < valueB) return sortOrder === 'asc' ? -1 : 1;
    if (valueA > valueB) return sortOrder === 'asc' ? 1 : -1;
    return 0;
  });

  const handleSort = (key: keyof User): void => {
    if (sortKey === key) {
      setSortOrder((prev) => (prev === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortKey(key);
      setSortOrder('asc');
    }
  };

  const handleSubmit = async (): Promise<void> => {
    try {
      setLoading(true);
      setError(null);
      if (editingId) {
        const originalUser = users.find((u) => u.id === editingId);
        if (
          originalUser &&
          originalUser.name === formData.name &&
          originalUser.email === formData.email &&
          originalUser.role === formData.role
        ) {
          setShowModal(false);
          setLoading(false);
          return;
        }
      }

      const user = editingId
        ? await updateUser({ ...formData, id: editingId })
        : await addUser(formData);

      setUsers((prev) =>
        editingId ? prev.map((u) => (u.id === user.id ? user : u)) : [...prev, user]
      );

      setFormData({ name: '', email: '', role: '' });
      setEditingId(null);
      setShowModal(false);

      if (!editingId) {
        showSnackbar(`User "${user.name}" added successfully!`, 'success');
      } else {
        showSnackbar(`User "${user.name}" updated successfully!`, 'info');
      }
    } catch (error) {
      console.error('Error in handleSubmit:', error);
      setError('Failed to add/update user. Please try again.');
      showSnackbar('Failed to add/update user', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (user: User): void => {
    setFormData({ name: user.name, email: user.email, role: user.role });
    setEditingId(user.id);
    setShowModal(true);
  };

  const handleDelete = async (user: User): Promise<void> => {
    try {
      setDeletingId(user.id); // Start fade-out
      setLoading(true);
      setError(null);

      await deleteUser(user.id);

      setTimeout(() => {
        setUsers((prev) => prev.filter((u) => u.id !== user.id));
        setDeletingId(null);
        setLoading(false);
        showSnackbar(`User "${user.name}" deleted successfully!`, 'warning');
      }, 400); // Match animation duration
    } catch (error) {
      setDeletingId(null);
      setLoading(false);
      console.error('Error in handleDelete:', error);
      setError('Failed to delete user. Please try again.');
      showSnackbar('Failed to delete user', 'error');
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
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 gap-2">
        <SearchBar value={search} onChange={setSearch} placeholder="Search users..." />
        <button
          onClick={handleAdd}
          className={`bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
          disabled={loading}
        >
          {loading ? 'Loading...' : 'Add User'}
        </button>
      </div>

      {error && (
        <div className="mb-4 text-red-600 bg-red-100 border border-red-200 rounded px-4 py-2">
          {error}
        </div>
      )}

      {loading && (
        <div className="flex justify-center items-center mb-4">
          <div className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full text-blue-500"></div>
          <p className="ml-2 text-blue-500">Loading...</p>
        </div>
      )}

      {sortedUsers.length > 0 ? (
        <UserTable
          users={sortedUsers}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onSort={handleSort}
          sortKey={sortKey}
          sortOrder={sortOrder}
          loading={loading}
          deletingId={deletingId} // Pass deletingId
        />
      ) : (
        <p className="text-gray-500 text-center mt-4">
          No users found. Please adjust your search or add a new user.
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

      {snackbar && <Snackbar message={snackbar.message} type={snackbar.type} />}
    </div>
  );
}