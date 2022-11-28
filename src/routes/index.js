import { Router } from "express";

import { wordsRouter } from "./words.route.js";

const router = Router();

router.use("/words", wordsRouter);

export const webRouter = router;
