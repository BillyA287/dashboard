export type User = {
  id: string;
  name: string;
  email: string;
  role: string;
};

export type UserDashboardProps = {
  initialUsers?: User[];
};
export interface UserTableProps {
  users: User[];
  onEdit: (user: User) => void;
  onDelete: (user: User) => Promise<void>;
  onSort: (key: keyof User) => void;
  sortKey: keyof User;
  sortOrder: 'asc' | 'desc';
  loading: boolean;
  deletingId: string | null;
}

export type UserRowProps = {
  user: User;
  onEdit: (user: User) => void;
  onDelete: (id: string) => void;
}

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

export type SnackbarProps = {
  message: string;
  type: 'success' | 'error' | 'info' | 'warning';
};


export type SortProps = {
  sortKey: string;
  sortOrder: 'asc' | 'desc';
  onSort: (key: string) => void;
}