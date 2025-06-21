import { NextRequest, NextResponse } from 'next/server';
import type { User } from '../../types/types';

import fs from 'fs/promises';
import path from 'path';

const filePath = path.join(process.cwd(), 'src/app/data/users.json');

async function readUsers(): Promise<User[]> {
  const data = await fs.readFile(filePath, 'utf-8');
  return JSON.parse(data);
}

async function writeUsers(users: User[]): Promise<void> {
  await fs.writeFile(filePath, JSON.stringify(users, null, 2), 'utf-8');
}

export async function GET() {
  const users = await readUsers();
  return NextResponse.json(users);
}

export async function POST(req: NextRequest) {
  const newUser: Omit<User, 'id'> = await req.json();
  const users = await readUsers();
  const user: User = { ...newUser, id: Date.now().toString() }; // Generate a unique ID
  users.push(user);

  await writeUsers(users); // Persist the updated users list
  return NextResponse.json(user);
}

export async function PUT(req: NextRequest) {
  const updatedUser: User = await req.json();
  console.log('Updated user received:', updatedUser); // Debugging

  const users = await readUsers();
  const updatedUsers = users.map(u => (u.id === updatedUser.id ? updatedUser : u));

  await writeUsers(updatedUsers); // Persist the updated users list
  return NextResponse.json(updatedUser);
}

export async function DELETE(req: NextRequest) {
  const { id }: { id: string } = await req.json();

  const users = await readUsers();
  const filteredUsers = users.filter(u => u.id !== id);

  await writeUsers(filteredUsers); // Persist the updated users list
  return NextResponse.json({ message: 'User deleted successfully' });
}