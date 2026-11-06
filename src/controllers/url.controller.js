import crypto from "crypto";
import { tracingChannel } from "diagnostics_channel";
import {getShortCode, getOriginalUrl, saveUrl} from "../store/url.store.js"
// import {nanoid} from "nanoid" ;

// temporary in-memory map

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

            // checking the methods also
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

        let shortCode = getShortCode(originalUrl) ;

        if (shortCode) {
            return res.status(200).json({
                shortCode: shortCode
            });
        }

        // short the url
        // const shortUrl = shorten(url) ;

        // method - 1

        do {
            shortCode = crypto.randomBytes(4).toString("hex");
        } while (getOriginalUrl(shortCode));

        // method - 2
        // const shortUrl = nanoid(8) ;

        // store in the db
        // db.add(shortUrl) ;

        saveUrl(shortCode, originalUrl) ;

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

    const originalUrl = getOriginalUrl(shortCode) ;

    if(!originalUrl) {
        return res.status(404).json({
            message: "Short URL not found."
        })
    }
    return res.redirect(302, originalUrl);
    
   } catch (error) {
    console.log(error) ;

    return res.status(500).json({
        message: "Internal server error" 
    });
   }
}