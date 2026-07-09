import { Router } from "express";

import {
  getServerHealth,
  getDbHealth,
} from "../controllers/health.controller.js";

const router = Router();

router.get("/", getServerHealth);
router.get("/db", getDbHealth);

export default router;
