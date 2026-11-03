import express from "express";
import { addUrl, redirectUrl } from "./src/controllers/url.controller.js";

const app = express();
const router = express.Router();

app.use(express.json());

app.get("/health", (req, res) => {
    res.status(200).json({
        status: "ok",
        message: "URL shortner URL is running."
    });
});

router.post('/url/add', addUrl);
router.get("/:shortCode", redirectUrl);

app.use(router);

export default app;