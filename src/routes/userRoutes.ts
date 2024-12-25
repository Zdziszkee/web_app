import { Router } from "express";
import { getUsersController } from "../controllers/userController";

const router = Router();

router.get("/users", getUsersController);

export default router;
