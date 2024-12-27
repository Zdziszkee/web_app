import database from "../utils/database";
import {UserModel} from "../models/userModel";

export const getUsers = async (): Promise<UserModel[]> => {
    return await database.selectFrom("users").selectAll().execute();
};
export const createUser = async (
    name: string,
    email: string,
    password: string,
): Promise<UserModel> => {
    const result = await database
        .insertInto("users")
        .values({
            name: name,
            email: email,
            hashedPassword: password,
        })
        .returning("userId")
        .executeTakeFirstOrThrow();
    if (!result.userId) {
        throw new Error(`Failed to insert user: ${name} ${email} ${password}`);
    }
    return {
        userId: result.userId,
        name: name,
        email: email,
        hashedPassword: password,
    };
};
export const findUserByEmail = async (
    email: string,
): Promise<UserModel | null> => {
    const user = await database.selectFrom("users")
        .selectAll()
        .where('email', '=', email)
        .executeTakeFirst();
    return user || null;
}
export const findUserByEmailOrName = async (
    email: string,
    name: string,
): Promise<UserModel | null> => {
    const user = await database
        .selectFrom("users")
        .selectAll()
        .where((builder) =>
            builder("email", "=", email).or(builder("name", "=", name)),
        )
        .executeTakeFirst();
    return user || null;
};
