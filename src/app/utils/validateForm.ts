export function validateUserForm(formData: { name: string; email: string; role: string }): string | null {
  if (!formData.name) return 'Name is required';
  if (!formData.email) return 'Email is required';
  if (!formData.role) return 'Role is required';
  return null;
}