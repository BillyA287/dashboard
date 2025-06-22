import UserDashboard from "./components/DashBoard/UserDashboard";
import { readUsers } from "./utils/userStore"; // Adjust path if needed
import type { User } from "./types/types";

export default async function Home() {
  // SSR: Fetch users on the server before rendering
  const users: User[] = await readUsers();

  return (
    <>
      <UserDashboard initialUsers={users} />
    </>
  );
}