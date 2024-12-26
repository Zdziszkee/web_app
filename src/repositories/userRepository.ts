import database from "../utils/database";
import {User} from "../models/userModel";

export const getUsers = async (): Promise<User[]> => {
    return await database.selectFrom("users").selectAll().execute();
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
        throw new Error(`Failed to insert user: ${name} ${email} ${password}`);
    }
    return {
        id: result.id,
        name: name,
        email: email,
        password: password,
    };
};
export const findUserByEmail = async (
    email: string,
): Promise<User | null> => {
    const user = await database.selectFrom("users")
        .selectAll()
        .where('email', '=', email)
        .executeTakeFirst();
    return user || null;
}
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
