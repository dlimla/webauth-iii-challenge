const router = require('express').Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const Users = require('../users/users-model.js');
const { jwtSecret } = require('../config/secrets.js');


router.post('/register', (req, res) => {
    let user = req.body
    const hash = bcrypt.hashSync(user.password, 10);
    user.password = hash;

    Users.add(user)
    .then(saved => {
        res.status(200).json(saved);
    })
    .catch(error => {
        res.status(500).json(error)
    });
});


router.post('/login', (req, res) => {
    let { users_name, password } = req.body;

    Users.findBy({ users_name })
    .first()
    .then(user => {
        if( user && bcrypt.compareSync(password, user.password)) {
            // const token = generateToken(user)
            res.status(200).json({ 
                // token,
                message: `Welcome ${user.users_name}!`,
            });
        } else {
            res.status(401).json({ messaage: 'Invalid Credentials' })
        }
    })
    .catch(error => {
        res.status(500).json(error)
    })
});


function generateToken(user) {
    const payload = {
        subject: user.id,
        username: users_name
    };

    const options = {
        expiresIn: '1d'
    };

    return jwt.sign(payload, jwtSecret, options)
}


module.exports = router;