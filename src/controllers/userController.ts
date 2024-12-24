import { Request, Response } from "express";
import { getUsers, registerUserService } from "../services/userService";

/**
 * Handles user registration.
 */
export const registerUserController = async (
  req: Request,
  res: Response,
): Promise<void> => {
  const { name, email, password, confirmPassword } = req.body;

  try {
    await registerUserService(name, email, password, confirmPassword);
    // Redirect to login page after successful registration
    res.redirect("/login");
  } catch (error: any) {
    console.log("error");
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
    res.render("userView", { users });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};
