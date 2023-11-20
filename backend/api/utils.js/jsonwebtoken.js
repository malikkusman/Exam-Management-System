const jwt = require('jsonwebtoken');
// Middleware function to validate JWT tokens

function validateToken(req, res, next) {

    let token = req.headers.authorization;
    token = token.split(' ')[1];
    if (!token) {

        return res.status(401).json({ message: 'No token provided' });

    }
    jwt.verify(token, "2334rw53tex", (err, decoded) => {

        if (err) {

            return res.status(403).json({ message: 'Failed to authenticate token' });

        }

        // If the token is valid, save the decoded information for later use

        req.user = decoded;

        next();

    });

}

function requireRoles(roles) {

    return (req, res, next) => {

        const userRole = req.body.role;
        console.log(userRole) // Assuming you saved the user's role in req.user

        if (roles.includes(userRole)) {
            next();

        } else {

            // User does not have any of the required roles, so send a forbidden response

            res.status(403).json({ message: 'Permission denied' });

        }

    };

}

module.exports = { validateToken , requireRoles};