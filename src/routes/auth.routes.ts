import { Router } from "express";

import { login, register, refresh } from "../controllers/auth.controller.js";

const router = Router();

router.post("/register", register);

router.post("/login", login);

router.post("/refresh-token", refresh);

export default router;
