const jwt = require('jsonwebtoken');
const secret = process.env.SECRET_KEY;

exports.generateToken = (user) => {
    return jwt.sign({ username: user.username }, secret, {
        expiresIn: 3600 // expires in 1 hour
    });
};

exports.verifyToken = (req, res, next) => {
    const token = req.headers['x-access-token'];
    if (!token) return res.status(403).send({ auth: false, message: 'No token provided' });

    jwt.verify(token, secret, (err, decoded) =>{
        if (err) return res.status(500).send({ auth: false, message: 'Failed to authenticate token' });

        // If everything is good, save decoded info to request for use in protected routes
        req.userId = decoded.id;
        next();
    });
};