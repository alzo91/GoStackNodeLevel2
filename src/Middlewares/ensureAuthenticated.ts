import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";
import authConfig from "../configs/auth";

interface TokenPayload {
  iat: number;
  exp: number;
  sub: string;
}
export default function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction
): void {
  const authorization = request.headers.authorization;

  if (!authorization) {
    throw new Error("JWT token is missing!");
  }

  const [, token] = authorization.split(" ");

  try {
    const decoded = verify(token, authConfig.secret);
    const { sub } = decoded as TokenPayload;

    request.user = { id: sub };
  } catch (err) {
    throw new Error("Invalid JWT token");
  }

  return next();
}
