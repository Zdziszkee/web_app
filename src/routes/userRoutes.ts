import { Router } from "express";
import {
  getUsersController,
  createUserController,
} from "../controllers/userController";
import authMiddleware from "../middlewares/authMiddleware";

const router = Router();

router.get("/users", authMiddleware, getUsersController);
router.post("/users", authMiddleware, createUserController);

export default router;
