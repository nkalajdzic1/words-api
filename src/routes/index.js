import { Router } from "express";

import { wordsRouter } from "./words.route.js";
import { healthRouter } from "./health.route.js";

const router = Router();

router.use("/words", wordsRouter);
router.use("/health", healthRouter);

export const webRouter = router;
