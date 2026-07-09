import type { Request, Response, NextFunction } from "express";

import jwt from "jsonwebtoken";

import { env } from "../config/env.js";

interface JwtUserPayload {
  id: string;
  email: string;
}

export function authMiddleware(
  req: Request,
  _res: Response,
  next: NextFunction,
) {
  const authorization = req.headers.authorization;

  if (!authorization) {
    return next();
  }

  const token = authorization.replace("Bearer ", "");

  try {
    const decoded = jwt.verify(token, env.JWT_SECRET);

    if (
      typeof decoded === "object" &&
      decoded !== null &&
      "id" in decoded &&
      "email" in decoded
    ) {
      req.user = {
        id: String(decoded.id),
        email: String(decoded.email),
      };
    }
  } catch {
    req.user = undefined;
  }

  next();
}
