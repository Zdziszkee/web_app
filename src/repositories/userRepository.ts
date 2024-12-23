import { Database } from "sqlite";
import { openDb } from "../utils/database";
import { User } from "../models/userModel";

export const getUsers = async (): Promise<User[]> => {
  const db = await openDb();
  const users = await db.all<User[]>("SELECT * FROM users");
  return users;
};

export const createUser = async (user: User): Promise<User> => {
  const db = await openDb();
  const result = await db.run(
    "INSERT INTO users (name, email, password) VALUES (?, ?, ?)",
    user.name,
    user.email,
    user.password,
  );
  return { id: result.lastID, ...user };
};
