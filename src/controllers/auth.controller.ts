import type { Request, Response } from "express";
import { authService } from "../services/auth.service.js";
import { refreshTokenCookieOptions } from "../config/cookie.js";

export async function register(req: Request, res: Response) {
  try {
    const { email, password, name } = req.body;

    const user = await authService.register({
      email,
      password,
      name,
    });

    res.status(201).json({
      message: "User registered successfully",
      user,
    });
  } catch (error) {
    res.status(400).json({
      message: error instanceof Error ? error.message : "Registration failed",
    });
  }
}

export async function login(req: Request, res: Response) {
  try {
    const { email, password } = req.body;

    const { accessToken, refreshToken, user } = await authService.login({
      email,
      password,
    });

    res.cookie("refreshToken", refreshToken, refreshTokenCookieOptions);

    res.status(200).json({
      message: "Login successful",
      accessToken,
      user,
    });
  } catch (error) {
    res.status(401).json({
      message: error instanceof Error ? error.message : "Login failed",
    });
  }
}

export async function refresh(req: Request, res: Response) {
  try {
    const refreshToken = req.cookies.refreshToken;

    if (!refreshToken) {
      res.status(401).json({
        message: "Refresh token missing",
      });

      return;
    }

    const { accessToken, newRefreshToken } = await authService.refresh(refreshToken);

    if (newRefreshToken) {
      res.cookie("refreshToken", newRefreshToken, refreshTokenCookieOptions);
    }

    res.status(200).json({
      accessToken,
    });
  } catch (error) {
    res.status(403).json({
      message: error instanceof Error ? error.message : "Refresh failed",
    });
  }
}
