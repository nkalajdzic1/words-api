import { Router } from "express";

const router = Router();

// api healthcheck
router.get("/", (_req, res) =>
  res.json({
    uptime: process.uptime(),
    message: "OK",
    timestamp: Date.now(),
  })
);

export const healthRouter = router;
