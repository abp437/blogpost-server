import type { StringValue } from "ms";

export const env = {
  NODE_ENV: process.env.NODE_ENV || "development",
  PORT: process.env.PORT || "3000",
  MONGO_URL: process.env.MONGO_URL || "mongodb://localhost:27017/blogpost",
  CLIENT_URL: process.env.CLIENT_URL || "http://localhost:5173",
  JWT_SECRET: process.env.JWT_SECRET || "my-secret",
  JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET || "my-refresh-secret",
  ACCESS_TOKEN_EXPIRES_IN:
    process.env.ACCESS_TOKEN_EXPIRES_IN || ("15m" as StringValue),
  REFRESH_TOKEN_EXPIRES_IN:
    process.env.REFRESH_TOKEN_EXPIRES_IN || ("7d" as StringValue),
};
