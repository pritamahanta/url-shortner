import express from "express";
import urlRoutes from "./routes/url.routes.js";

const app = express();

app.use(express.json());

app.get("/health", (req, res) => {
    res.status(200).json({
        status: "ok",
        message: "URL Shortener is running."
    });
});

app.use(urlRoutes);

export default app;