import database from "../utils/database";
import { User } from "../models/userModel";
import { ExpressionBuilder } from "kysely";

export const getUsers = async (): Promise<User[]> => {
  const users = await database.selectFrom("users").selectAll().execute();
  return users;
};

export const createUser = async (user: User): Promise<User> => {
  const result = await database
    .insertInto("users")
    .values({
      id: user.id,
      name: user.name,
      email: user.email,
      password: user.password,
    })
    .returning(["id", "name", "email", "password"])
    .executeTakeFirstOrThrow();
  return result;
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
