import type { User } from '../types/types';

export function handleEdit(
  user: User,
  setFormData: React.Dispatch<React.SetStateAction<Omit<User, 'id'>>>,
  setEditingId: React.Dispatch<React.SetStateAction<string | null>>,
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>
): void {
  setFormData({ name: user.name, email: user.email, role: user.role });
  setEditingId(user.id);
  setShowModal(true);
}

export function handleDelete(
  id: string,
  users: User[],
  setUsers: React.Dispatch<React.SetStateAction<User[]>>
): void {
  const updatedUsers = users.filter((user) => user.id !== id);
  setUsers(updatedUsers);
}