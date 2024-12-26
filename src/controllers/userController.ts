import {Request, Response} from "express";
import {getUsers, loginUserService, registerUserService} from "../services/userService";

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
        res.status(200).json(registerUserResult);
    }

};

export const loginUserController = async (
    req: Request,
    res: Response,
): Promise<void> => {
    const {email, password} = req.body;
    const [loginUserResult, token] = await loginUserService(email, password);

    res.status(200).json(loginUserResult)

    if (loginUserResult.success && token) {
        res.cookie('token', token, {
            httpOnly: true,
            secure: true, // Use HTTPS
            sameSite: 'strict',
        });
    }
}
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
        res.status(200).json({error: error.message});
    }
};
