// Import the required modules
const jwt = require('jsonwebtoken');
const User = require('../models/user');

// Middleware function for user authentication
const auth = async (req, res, next) => {
    try {
        // Extract the token from the request header
        const token = req.header('Authorization').replace('Bearer ', '');
        // Verify the token using the secret key
        const decoded = jwt.verify(token, 'thisismynewcourse');
        // Find the user based on the decoded token and token stored in the user's tokens array
        const user = await User.findOne({ _id: decoded._id, 'tokens.token': token });

        // If user is not found, throw an error
        if (!user) {
            throw new Error();
        }
        
        // Attach the token and user object to the request object for further use
        req.token = token;
        req.user = user;
        // Call the next middleware function
        next();
    } catch (e) {
        // If authentication fails, send a 404 error response
        res.status(404).send({ error: 'Please authenticate' });
    }
}

// Export the auth middleware function
module.exports = auth;
