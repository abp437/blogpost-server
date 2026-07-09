import type { Request } from "express";

export interface GraphQLContext {
  user?: {
    id: string;
    email: string;
  };
}

export function createContext(req: Request): GraphQLContext {
  return {
    user: req.user,
  };
}
