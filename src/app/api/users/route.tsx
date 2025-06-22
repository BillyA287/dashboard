import { NextRequest, NextResponse } from 'next/server';
import { readUsers, writeUsers } from '../../utils/userStore';
import type { User } from '../../types/types';

export async function GET(): Promise<NextResponse> {
  const users: User[] = await readUsers(); // Fetch all users
  return NextResponse.json(users);
}

export async function POST(req: NextRequest): Promise<NextResponse> {
  const newUser: Omit<User, 'id'> = await req.json(); // Parse the request body
  const users: User[] = await readUsers(); // Fetch existing users
  const user: User = { ...newUser, id: Date.now().toString() }; // Generate a unique ID
  users.push(user);

  await writeUsers(users); // Save the updated users list
  return NextResponse.json(user);
}