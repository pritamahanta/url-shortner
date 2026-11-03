import dotenv from "dotenv";
dotenv.config();

import express from "express";
import { addUrl, redirectUrl } from "./src/controllers/url.controller.js";

const app = express() ;
const PORT = process.env.PORT || 3000 

const router = express.Router() ;

app.use(express.json()) ;

app.get("/health", (req, res) => {
    res.status(200).json({
        status: "ok",
        message: "URL shortner URL is running."
    })
});

router.post('/url/add', addUrl) ;
app.get("/:shortCode", redirectUrl);

app.use(router)


app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`) ;
})