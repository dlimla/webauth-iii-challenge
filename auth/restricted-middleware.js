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


// module.exports = (req, res, next) => {
//     const { users_name, password } = req.headers;

//     if(users_name && password) {
//         Users.findBy({ users_name })
//             .first()
//             .then(user => {
//                 if( user && bcrypt.compareSync(password, user.password)) {
//                     next();
//                 } else {
//                     res.status(501).json({ 
//                         message: 'Invalid Credientials'
//                     })
//                 }
//             }) 
//             .catch(error => {
//                 res.status(500).json({
//                     message: 'Ran into an unexptected error'
//                 })
//             })
//     } else {
//         res.status(500).json({
//             message: 'No credentials provided'
//         });
//     }
// }