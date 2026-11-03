import dotenv from "dotenv";
dotenv.config();

import express from "express";
import { addUrl } from "./src/url-shortner";

const app = express() ;
const PORT = process.env.PORT || 3000 

const router = express.Router() ;

app.use(express.json()) ;

router.post('/url/add', addUrl) ;

app.use(router)

app.get("/health", (req, res) => {
    res.status(200).json({
        status: "ok",
        message: "URL shortner URL is running."
    })
});

app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`) ;
})