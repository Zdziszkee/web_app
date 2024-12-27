import {
    createUser,
    findUserByEmail,
    findUserByEmailOrName,
    getUsers as getUsersRepo,
} from "../repositories/userRepository";
import {UserModel} from "../models/userModel";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const getUsers = async (): Promise<UserModel[]> => {
    // Additional business logic can be added here
    return await getUsersRepo();
};


export interface UserQueryResult {
    success: boolean;
    message: string;
}

export interface LoginUserResult {
    success: boolean;
    message: string;
    jwt?: string;
}

export const loginUserService = async (email: string, password: string): Promise<[UserQueryResult,string | null]> => {
    const user = await findUserByEmail(email);
    if (!user) {
        return [{success: false, message: "User with that email does not exist!"},null];
    }
    const passwordMatch = await bcrypt.compare(password, user.hashedPassword);

    if (!passwordMatch) {
        return [{success: false, message: "Password provided is wrong!"},null];
    }
    const SECRET_KEY = process.env.JWT_SECRET_KEY

    if (!SECRET_KEY) {
        throw new Error("JWT_SECRET_KEY is missing in environment variable!");
    }

    const token = jwt.sign({userId: user.userId}, SECRET_KEY, {
        expiresIn: '1h',
    });
    return [{success: true, message: "Successfully logged in!"},token];
}

export const registerUserService = async (
    name: string,
    email: string,
    password: string,
): Promise<UserQueryResult> => {
    // Check if user with the same email or name exists
    const existingUser = await findUserByEmailOrName(email, name);

    if (existingUser) {
        const existingEmail = existingUser.email;
        const existingName = existingUser.name;
        if (existingEmail == email && existingName == name) {
            return {success: false, message: "User with that name and email already exists"};
        } else if (existingName == name) {
            return {success: false, message: "User with that name already exists"};
        } else if (existingEmail == email) {
            return {success: false, message: "User with that email already exists"};
        }
    }

    password = await bcrypt.hash(password, 10);
    const createdUser = await createUser(name, email, password);
    return {success: true, message: `User created successfully. ${createdUser}`};
};
