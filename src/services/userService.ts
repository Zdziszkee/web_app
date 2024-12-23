import {
  getUsers as getUsersRepo,
  createUser as createUserRepo,
} from "../repositories/userRepository";
import { User } from "../models/userModel";

export const getUsers = async (): Promise<User[]> => {
  return await getUsersRepo();
};

export const createUser = async (user: User): Promise<User> => {
  return await createUserRepo(user);
};
