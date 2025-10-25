import { users } from "@/data/users";
import { User } from "@/types/user";

export function getAllUsers(): Promise<User[]> {
  return Promise.resolve(users);
} 