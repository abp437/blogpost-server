import type { Request, Response } from "express";

import mongoose from "mongoose";

export const getServerHealth = (_req: Request, res: Response) => {
  return res.status(200).json({
    status: "ok",
    serverTime: new Date().toISOString(),
    uptimeSeconds: process.uptime(),
    message: "Server is running",
  });
};

export const getDbHealth = async (_req: Request, res: Response) => {
  const start = Date.now();

  try {
    const db = mongoose.connection;

    if (db.readyState !== 1) {
      throw new Error("Database is not connected");
    }

    // MongoDB ping command
    await db.db?.command({
      ping: 1,
    });

    const latencyMs = Date.now() - start;

    return res.status(200).json({
      status: "ok",
      database: "connected",
      dbName: db.name,
      latencyMs,
      serverTime: new Date().toISOString(),
    });
  } catch (error) {
    console.error("DB health check failed:", error);

    return res.status(500).json({
      status: "error",
      database: "disconnected",
      serverTime: new Date().toISOString(),
    });
  }
};
