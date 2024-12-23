import {
  getUsers as getUsersRepo,
  createUser as createUserRepo,
} from "../repositories/userRepository";
import { User } from "../models/userModel";

export const getUsers = async (): Promise<User[]> => {
  // Additional business logic can be added here
  return await getUsersRepo();
};

export const createUser = async (user: User): Promise<User> => {
  // Additional business logic can be added here
  // For example, hashing the password before saving the user
  user.password = hashPassword(user.password);
  return await createUserRepo(user);
};

// Example of a business logic function
const hashPassword = (password: string): string => {
  // Implement password hashing logic here
  return password; // Replace with actual hashing logic
};
