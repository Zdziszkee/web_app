import {
  getUsers as getUsersRepo,
  createUser as createUserRepo,
  findUserByEmailOrName,
} from "../repositories/userRepository";
import { User } from "../models/userModel";
import bcrypt from "bcrypt";

export const getUsers = async (): Promise<User[]> => {
  // Additional business logic can be added here
  return await getUsersRepo();
};

export const registerUserService = async (
  name: string,
  email: string,
  password: string,
  confirmPassword: string,
): Promise<User> => {
  // Check if user with the same email or name exists
  const existingUser = await findUserByEmailOrName(email, name);

  if (existingUser) {
    throw new Error("An account with that email or username already exists.");
  }

  // Hash the password before saving
  if (password) {
    password = await hashPassword(password);
  }

  return await createUserRepo(name, email, password);
};

// Function to hash password using bcrypt
const hashPassword = async (password: string): Promise<string> => {
  const saltRounds = 10;
  return await bcrypt.hash(password, saltRounds);
};
