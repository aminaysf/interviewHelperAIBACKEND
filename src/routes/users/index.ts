import { Request, Response, Router } from "express";
import { createUserSchema } from "./types/auth";
import validateBody from "../../core/middleware/validateBody";
import asyncHandler from "../../core/middleware/asyncHandler";
import { createUserRoute } from "./auth/signup";
import usersAuthRouter from "./auth";


const usersRouter = Router();
usersRouter.use("/auth", usersAuthRouter)     



export default usersRouter;