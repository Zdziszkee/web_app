import { Request, Response } from "express";
import { getUsers, createUser } from "../services/userService";

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

export const createUserController = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const user = await createUser(req.body);
    res.redirect("/users");
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};
