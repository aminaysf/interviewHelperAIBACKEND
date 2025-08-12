import { Request, Response, Router } from "express";
import {  createUserSchema, userLoginSchema } from "../types/auth";
import validateBody from "../../../core/middleware/validateBody";
import asyncHandler from "../../../core/middleware/asyncHandler";
import validateUserToken from "../../../core/middleware/validateUserToken";
import { createUserRoute } from "./signup";
import { loginUserRoute } from "./login";
import { verifyUserTokenRoute } from "./verify";



const usersAuthRouter = Router();
usersAuthRouter.post("/signup", [validateBody(createUserSchema)] ,asyncHandler(createUserRoute))
usersAuthRouter.post("/login", [validateBody(userLoginSchema)] ,asyncHandler(loginUserRoute))
usersAuthRouter.post("/verify-token", [validateUserToken] ,asyncHandler(verifyUserTokenRoute))





export default usersAuthRouter;