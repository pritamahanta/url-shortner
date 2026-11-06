import { Router } from "express";
import { addUrl, redirectUrl } from "../controllers/url.controller.js";

const router = Router();

router.post("/url/add", addUrl);
router.get("/:shortCode", redirectUrl);

export default router;