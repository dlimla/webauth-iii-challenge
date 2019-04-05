const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


const Users = require('../users/users-model.js');
const { jwtSecret } = require('../config/secrets.js');

module.exports = (req, res, next) => {
    const token = req.headers.authorization;

    if(token) {
        jwt.verify(token, jwtSecret, (err, decodedToken) => {
            if(err) {
                res.status(401).json({
                    err: 'user not verifed'
                })
            } else {
                console.log('token confirmed', decodedToken)
                req.decodedJwt = decodedToken;
                next();
            }
        })
    } else {
        res.status(401).json({ 
            err: 'user not authorizaed' 
        })
    }
}