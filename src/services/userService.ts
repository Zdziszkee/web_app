import {
  getUsers as getUsersRepo,
  createUser as createUserRepo,
  findUserByEmailOrName as findUserRepo,
} from "../repositories/userRepository";
import { User } from "../models/userModel";
import bcrypt from "bcrypt";

export const getUsers = async (): Promise<User[]> => {
  // Additional business logic can be added here
  return await getUsersRepo();
};

export const createUser = async (user: Partial<User>): Promise<User> => {
  // Check if user with the same email or name exists
  const existingUser = await findUserRepo(user.email, user.name);
  if (existingUser) {
    throw new Error("An account with that email or username already exists.");
  }

  // Hash the password before saving
  if (user.password) {
    user.password = await hashPassword(user.password);
  }

  return await createUserRepo(user as User);
};

// Function to hash password using bcrypt
const hashPassword = async (password: string): Promise<string> => {
  const saltRounds = 10;
  return await bcrypt.hash(password, saltRounds);
};
