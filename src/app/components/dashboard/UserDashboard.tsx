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

  useEffect(() => {
    fetch('/api/users')
      .then(res => res.json())
      .then(setUsers)
      .catch(err => console.error('Error fetching users:', err));
  }, []);

  const handleSubmit = async () => {
    const method = editingId ? 'PUT' : 'POST';
    const body = editingId ? { ...formData, id: editingId } : formData;

    const res = await fetch('/api/users', {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
    const user = await res.json();

    setUsers(prev => {
      if (editingId) return prev.map(u => (u.id === user.id ? user : u));
      return [...prev, user];
    });

    setFormData({ name: '', email: '', role: '' });
    setEditingId(null);
    setShowModal(false);
  };

  const handleEdit = (user: User) => {
    setFormData({ name: user.name, email: user.email, role: user.role });
    setEditingId(user.id);
    setShowModal(true);
  };

  const handleDelete = async (id: string) => {
    await fetch('/api/users', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id }),
    });
    setUsers(prev => prev.filter(u => u.id !== id));
  };

  const handleAdd = () => {
    setFormData({ name: '', email: '', role: '' });
    setEditingId(null);
    setShowModal(true);
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">User Management Dashboard</h1>
      <button onClick={handleAdd} className="mb-4 bg-green-600 text-white px-4 py-2 rounded">
        Add User
      </button>

      <UserTable users={users} onEdit={handleEdit} onDelete={handleDelete} />

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
    </div>
  );
}