import {createUser, findUserByEmailOrName, getUsers as getUsersRepo,} from "../repositories/userRepository";
import {User} from "../models/userModel";
import bcrypt from "bcrypt";

export const getUsers = async (): Promise<User[]> => {
    // Additional business logic can be added here
    return await getUsersRepo();
};


export interface RegisterUserResult {
    success: boolean;
    message: string;
    user?: {
        id: string;
        name: string;
        email: string;
    };
}

export const registerUserService = async (
    name: string,
    email: string,
    password: string,
): Promise<RegisterUserResult> => {
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

    password = await hashPassword(password);
    const createdUser = await createUser(name, email, password);
    return {success: true, message: `User created successfully. ${createdUser}`};
};

// Function to hash password using bcrypt
const hashPassword = async (password: string): Promise<string> => {
    const saltRounds = 10;
    return await bcrypt.hash(password, saltRounds);
};
