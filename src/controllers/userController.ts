import { Request, Response } from "express";
import { getUsers, createUser } from "../services/userService";

/**
 * Renders the registration page.
 */
export const getRegisterController = (req: Request, res: Response): void => {
  res.render("registerView", { error: null, fullName: "", email: "" });
};

/**
 * Handles user registration.
 */
export const createUserController = async (
  req: Request,
  res: Response,
): Promise<void> => {
  const { fullName, email, password, confirmPassword } = req.body;

  try {
    await createUser({
      name: fullName,
      email,
      password,
    });
    // Redirect to login page after successful registration
    res.redirect("/login");
  } catch (error: any) {
    res.render("registerView", {
      error: error.message || "An error occurred. Please try again.",
      fullName,
      email,
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
    res.render("userView", { users });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};
