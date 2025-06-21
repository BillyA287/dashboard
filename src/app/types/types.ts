export type User = {
  id: string;
  name: string;
  email: string;
  role: string;
};

export type UserTableProps = {
  users: User[];
  onEdit: (user: User) => void;
  onDelete: (id: string) => void;
};

export type UserFormProps = {
  formData: Omit<User, 'id'>; 
  setFormData: React.Dispatch<React.SetStateAction<Omit<User, 'id'>>>; 
  onSubmit: () => void; 
  editing: boolean; 
};

export type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  user?: User;
  onSubmit: (user: User) => void;
children: React.ReactNode;
};