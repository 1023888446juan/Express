const resgistroMiddleware = (req, res, next) => {
    const fecha = new Date().toISOString();
    console.log(`[Historia Peticiones] ${fecha}, ${req.method} ${req.url}, ${req.ip}`);

    next();
}

module.exports = resgistroMiddleware