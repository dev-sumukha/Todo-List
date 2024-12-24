
const jwt = require('jsonwebtoken');

module.exports.requireAuth = function(req, res, next) {
    const token = req.cookies.login_token;

    // Checking if the token exists
    if (!token) {
        return res.status(401).json({ message: 'No token, authorization denied' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
        req.user = decoded;
        next();
    } catch (e) {
        res.status(401).json({ message: 'Invalid token' });
    }
}


module.exports.authMiddleware = function(req, res, next) {
    const token = req.header('Authorization');
    // console.log(token)

    if (!token) {
        return res.status(401).json({ message: 'Unauthorized - No token provided' });
    }

    const jwtToken = token.replace('Bearer ', '').trim();
    console.log(jwtToken)

    try {
        const decoded = jwt.verify(jwtToken, process.env.JWT_SECRET_KEY);
        req.user = decoded; 
        next();
    } catch (error) {
        console.error('Error verifying token:', error.message);
        return res.status(401).json({ message: 'Unauthorized - Invalid token' });
    }
};