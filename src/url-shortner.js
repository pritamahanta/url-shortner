


export function addUrl(req, res) {

    try {
        const url = req.body ;

        if(!url) {
            return res.status(400).json ({
                message: "URL not found."
            })
        }

        // caching 
        // if(db(url) present) return db[url]

        // short the url
        // const shortUrl = shorten(url) ;

        // store in the db
        // db.add(shortUrl) ;

        return res.status(201).json({
            message: "URL processed successfully.",
            url: url
        });

    }
    catch (err) {
        console.log(err) ;

        return res.status(500).json({
            message: "Internal server error.",
            error: err.message
        });
    }
   
}