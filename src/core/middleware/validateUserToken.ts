import jwt from 'jsonwebtoken';
import { NextFunction, Request, Response } from "express";

export interface UserRequest extends Request {
    userId?: string;
}

export default function validateUserToken(req: UserRequest, res: Response, next: NextFunction) {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      res.status(401).json({ message: "Unauthorized: Missing or invalid token" });
      return;
    }
    const token = authHeader.split(" ")[1];
    console.log("Received token:", token);
    if (!token) {
      res.status(401).json({ message: "Unauthorized: Token not provided" });
      return;
    }
    const decoded = jwt.verify(token, process.env.USERS_JWT_SECRET as string) as { id: string };
    req.userId = decoded.id;
    next();
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      console.log("Token verification error: Token expired");
      res.status(403).json({ message: "Unauthorized: Token expired or invalid. Please log in again." });
    } else if (error instanceof jwt.JsonWebTokenError) {
      console.log("Token verification error: Invalid token", error.message);
      res.status(403).json({ message: "Unauthorized: Token expired or invalid. Please log in again." });
    } else {
      console.log("Unexpected token verification error:", error);
      res.status(403).json({ message: "Unauthorized: Token expired or invalid. Please log in again." });
    }
    return;
  }
}