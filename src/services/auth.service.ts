import bcrypt from "bcryptjs";
import jwt, {
  type SignOptions,
} from "jsonwebtoken";
import type { StringValue } from "ms";

import User from "../models/User.js";
import { env } from "../config/env.js";

interface RegisterInput {
  name: string;
  email: string;
  password: string;
}

interface LoginInput {
  email: string;
  password: string;
}

function generateAccessToken(payload: object) {
  const options: SignOptions = {
    expiresIn: env.ACCESS_TOKEN_EXPIRES_IN as StringValue,
  };

  return jwt.sign(payload, env.JWT_SECRET, options);
}

function generateRefreshToken(payload: object) {
  const options: SignOptions = {
    expiresIn: env.REFRESH_TOKEN_EXPIRES_IN as StringValue,
  };

  return jwt.sign(payload, env.JWT_REFRESH_SECRET, options);
}

export const authService = {
  async register(data: RegisterInput) {
    const existingUser = await User.findOne({
      email: data.email,
    });

    if (existingUser) {
      throw new Error("User already exists");
    }

    const hashedPassword = await bcrypt.hash(data.password, 12);

    const user = await User.create({
      name: data.name,
      email: data.email,
      password: hashedPassword,
    });

    return {
      id: user._id,
      name: user.name,
      email: user.email,
    };
  },

  async login(data: LoginInput) {
    const user = await User.findOne({
      email: data.email,
    });

    if (!user) {
      throw new Error("Invalid email or password");
    }

    const passwordMatch = await bcrypt.compare(data.password, user.password);

    if (!passwordMatch) {
      throw new Error("Invalid email or password");
    }

    const payload = {
      id: user._id.toString(),
      email: user.email,
    };

    const accessToken = generateAccessToken(payload);

    const refreshToken = generateRefreshToken(payload);

    return {
      accessToken,
      refreshToken,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    };
  },

  async refresh(refreshToken: string) {
    let decoded:
      | {
          id: string;
          email: string;
        }
      | undefined;

    try {
      decoded = jwt.verify(refreshToken, env.JWT_REFRESH_SECRET) as {
        id: string;
        email: string;
      };
    } catch {
      throw new Error("Invalid refresh token");
    }

    const user = await User.findById(decoded.id);

    if (!user) {
      throw new Error("User no longer exists");
    }

    const payload = {
      id: user._id.toString(),
      email: user.email,
    };

    const accessToken = generateAccessToken(payload);

    const newRefreshToken = generateRefreshToken(payload);

    return {
      accessToken,
      newRefreshToken,
    };
  },
};
