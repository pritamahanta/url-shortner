

const shortCodeToUrl = new Map();
const urlToShortCode = new Map();


export function getShortCode(originalUrl) {
    return urlToShortCode.has(originalUrl) ? urlToShortCode.get(originalUrl) : null ;
}

export function getOriginalUrl(shortCode) {
    return shortCodeToUrl.has(shortCode) ? shortCodeToUrl.get(shortCode) : null ;
}

export function saveUrl(shortCode, originalUrl) {
    shortCodeToUrl.set(shortCode, originalUrl) ;
    urlToShortCode.set(originalUrl, shortCode) ;
}