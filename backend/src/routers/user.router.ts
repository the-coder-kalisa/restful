import { Router } from "express";
import { login, me, register } from "../controllers/user.controller";
import authMiddleware from "../middlewares/auth.middleware";

const userRouter = Router();

userRouter.post("/login", login);
userRouter.post("/register", register)
userRouter.get("/me", authMiddleware, me);

export default userRouter;