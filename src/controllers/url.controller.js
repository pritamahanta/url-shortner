import crypto from "crypto";
import { tracingChannel } from "diagnostics_channel";
// import {nanoid} from "nanoid" ;

// temporary in-memory map

const shortCodeToUrl = new Map();
const urlToShortCode = new Map();

export function addUrl(req, res) {

    try {
        const { originalUrl } = req.body ?? {};

        if (!originalUrl) {
            return res.status(400).json({
                message: "URL not found."
            })
        }

        // parsing the url
        try {
            const parsedUrl = new URL(originalUrl);

            if (!["http:", "https:"].includes(parsedUrl.protocol)) {
                return res.status(400).json({
                    message: "Only HTTP and HTTPS URLs are supported."
                });
            }
        } catch (err) {
            return res.status(400).json({
                message: "Invalid URL format. Please provide a valid URL (e.g., https://example.com)."
            });
        }
        // caching 
        // if(db(url) present) return db[url]

        if (urlToShortCode.has(originalUrl)) {

            const shortCode = urlToShortCode.get(originalUrl);
            return res.status(200).json({
                shortCode: shortCode
            });
        }

        // short the url
        // const shortUrl = shorten(url) ;

        // method - 1
        let shortCode;

        do {
            shortCode = crypto.randomBytes(4).toString("hex");
        } while (shortCodeToUrl.has(shortCode));

        // method - 2
        // const shortUrl = nanoid(8) ;

        // store in the db
        // db.add(shortUrl) ;

        shortCodeToUrl.set(shortCode, originalUrl);
        urlToShortCode.set(originalUrl, shortCode);

        return res.status(201).json({
            message: "URL processed successfully.",
            shortCode: shortCode
        });

    }
    catch (err) {
        console.log(err);

        return res.status(500).json({
            message: "Internal server error.",
            error: err.message
        });
    }
}

export function redirectUrl(req, res) {

   try {
    const {shortCode} = req.params;

    if(!shortCodeToUrl.has(shortCode)) {
        return res.status(404).json({
            message: "Short URL not found."
        })
    }
    const orignalUrl = shortCodeToUrl.get(shortCode) ;
    return res.redirect(302, originalUrl);
    
   } catch (error) {
    console.log(error) ;

    return res.status(500).json({
        message: "Internal server error" 
    });
   }
}