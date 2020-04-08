const config = require('config');
const jwt = require('jsonwebtoken');

function auth(req, res, next)
{
    const token = req.header('x-auth-token');

    // Check for token
    if(!token)
        // Permission denied
        return res.status(401).json({ msg: 'Not logged in, no jwt login token'});

    try 
    {
        // Verify token
        const check = jwt.verify(token, config.get('jwtSecret'));
        // Add user from payload
        req.user = check;
        next();
    }
    
    catch(e)
    {
        res.status(400).json({ msg: 'Token is not valid'});
    }
        
    
}

module.exports = auth;