import { NextRequest, NextResponse } from 'next/server';
import type { User } from '../../types/types'; 

let users: User[] = [
  { id: '1', name: 'Alice Johnson', email: 'alice@example.com', role: 'Admin' },
  { id: '2', name: 'Bob Smith', email: 'bob@example.com', role: 'Editor' },
];

export async function GET() {
  return NextResponse.json(users); 
}

export async function POST(req: NextRequest) {
  const newUser: Omit<User, 'id'> = await req.json();
  console.log('New user received:', newUser); // Debugging

  const user: User = { ...newUser, id: Date.now().toString() }; 
  users.push(user); 
  return NextResponse.json(user); 
}

export async function PUT(req: NextRequest) {
  const updatedUser: User = await req.json();
  console.log('Updated user received:', updatedUser); // Debugging

  users = users.map(u => (u.id === updatedUser.id ? updatedUser : u)); 
  return NextResponse.json(updatedUser); 
}

export async function DELETE(req: NextRequest) {
  const { id }: { id: string } = await req.json();
  console.log('User ID to delete:', id); // Debugging

  users = users.filter(u => u.id !== id); 
  return NextResponse.json({ message: 'User deleted successfully' }); 
}