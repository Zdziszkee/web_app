import {Request, response, Response} from "express";
import {getUsers, registerUserService} from "../services/userService";

/**
 *  Client sends REQUEST -> Controller listen to requests -> Service processes requests -> Repository fetches data
 */
export const registerUserController = async (
    req: Request,
    res: Response,
): Promise<void> => {
    const {name, email, password} = req.body;

    const registerUserResult = await registerUserService(name, email, password);

    if (registerUserResult.success) {
        res.redirect("/login");
    } else {
        res.status(400).json({
            success: false,
            message: registerUserResult.message,
        });
    }

};

/**
 * Renders the user list page.
 */
export const getUsersController = async (
    req: Request,
    res: Response,
): Promise<void> => {
    try {
        const users = await getUsers();
        res.render("userView", {users});
    } catch (error: any) {
        res.status(500).json({error: error.message});
    }
};
