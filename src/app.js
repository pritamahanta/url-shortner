import express from "express";
import { addUrl, redirectUrl } from "./controllers/url.controller.js";

export const app = express();
export const router = express.Router();

app.use(express.json());

app.get("/health", (req, res) => {
    res.status(200).json({
        status: "ok",
        message: "URL shortner URL is running."
    });
});

app.use(router);