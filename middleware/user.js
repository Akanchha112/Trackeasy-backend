const jwt = require('jsonwebtoken');

function usermiddleware(req, res, next) {
    const token = req.headers.authorization;
    if (!token) {
        return res.status(403).json({ msg: "User not logged in" });
    }

    const tok = token.split(" ");
    if (tok.length !== 2 || tok[0] !== 'Bearer') {
        return res.status(403).json({ msg: "Invalid token format" });
    }

    try {
        const response = jwt.verify(tok[1], 'secretkey');
        if (!response) {
            return res.status(403).json({ msg: "Invalid token" });
        }
        req.user = response;
        req.username = response.username;
        console.log("Inside middleware", req.username);
        next();
    } catch (error) {
        console.error('Error:', error);
        return res.status(500).json({ msg: 'Internal Server Error' });
    }
}

module.exports = usermiddleware;
