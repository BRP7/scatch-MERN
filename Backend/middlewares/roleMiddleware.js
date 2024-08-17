function adminMiddleware(req, res, next) {
    console.log(req.user);
    if (req.user.role !== 'admin') {
        return res.status(403).send('Access denied.');
    }
    next();
}

function sellerMiddleware(req, res, next) {
    if (req.user.role !== 'seller' && req.user.role !== 'premiumSeller' && req.user.role !== 'admin') {
        return res.status(403).send('Access denied.');
    }
    next();
}

function premiumSellerMiddleware(req, res, next) {
    if (req.user.role !== 'premium seller' && req.user.role !== 'admin') {
        return res.status(403).send('Access denied.');
    }
    next();
}

function customerMiddleware(req, res, next) {
    if (req.user.role !== 'user' && req.user.role !== 'admin') {
        return res.status(403).send('Access denied.');
    }
    next();
}

export { adminMiddleware, sellerMiddleware, premiumSellerMiddleware, customerMiddleware };
