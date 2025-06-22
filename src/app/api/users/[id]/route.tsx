import { NextRequest, NextResponse } from 'next/server';
import { readUsers, writeUsers } from '../../../utils/userStore';
import type { User } from '../../../types/types';

export async function GET(req: NextRequest): Promise<NextResponse> {
  const id = req.url.split('/').pop(); // Extract the user ID from the URL
  const users: User[] = await readUsers(); // Fetch all users
  const user = users.find((u) => u.id === id); // Find the user by ID

  if (!user) {
    return NextResponse.json({ message: 'User not found' }, { status: 404 });
  }

  return NextResponse.json(user);
}

export async function PUT(req: NextRequest): Promise<NextResponse> {
  const updatedUser: User = await req.json(); // Parse the request body
  const users: User[] = await readUsers(); // Fetch existing users
  const index = users.findIndex((u) => u.id === updatedUser.id); // Find the user index

  if (index === -1) {
    return NextResponse.json({ message: 'User not found' }, { status: 404 });
  }

  users[index] = updatedUser; // Update the user
  await writeUsers(users); // Save the updated users list
  return NextResponse.json(updatedUser);
}

export async function DELETE(req: NextRequest): Promise<NextResponse> {
  const id = req.url.split('/').pop(); // Extract the user ID from the URL
  const users: User[] = await readUsers(); // Fetch all users
  const filteredUsers = users.filter((u) => u.id !== id); // Remove the user by ID

  await writeUsers(filteredUsers); // Save the updated users list
  return NextResponse.json({ message: 'User deleted successfully' });
}