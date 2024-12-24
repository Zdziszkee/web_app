import database from "../utils/database";
import { User } from "../models/userModel";
import { ExpressionBuilder } from "kysely";
import { DatabaseSchema } from "../utils/database";
export const getUsers = async (): Promise<User[]> => {
  const users = await database.selectFrom("users").selectAll().execute();
  return users;
};
export const createUser = async (
  name: string,
  email: string,
  password: string,
): Promise<User> => {
  const result = await database
    .insertInto("users")
    .values({
      name: name,
      email: email,
      password: password,
    })
    .returning("id")
    .executeTakeFirstOrThrow();
  if (!result.id) {
    throw new Error("Failed to insert user");
  }
  const user: User = {
    id: result.id,
    name: name,
    email: email,
    password: password,
  };
  return user;
};

export const findUserByEmailOrName = async (
  email: string,
  name: string,
): Promise<User | null> => {
  const user = await database
    .selectFrom("users")
    .selectAll()
    .where((builder) =>
      builder("email", "=", email).or(builder("name", "=", name)),
    )
    .executeTakeFirst();
  return user || null;
};
