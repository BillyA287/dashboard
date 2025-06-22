import fs from 'fs/promises';
import path from 'path';
import type { User } from '../types/types';

const filePath = path.join(process.cwd(), 'src/app/data/users.json');

export async function readUsers(): Promise<User[]> {
  const data = await fs.readFile(filePath, 'utf-8');
  return JSON.parse(data);
}

export async function writeUsers(users: User[]): Promise<void> {
  await fs.writeFile(filePath, JSON.stringify(users, null, 2), 'utf-8');
}