const bcrypt = require('bcrypt');
const Users = require('../users/users-model.js');

module.exports = (req, res, next) => {
    const { users_name, password } = req.headers;

    if(users_name && password) {
        Users.findBy({ users_name })
            .first()
            .then(user => {
                if( user && bcrypt.compareSync(password, user.password)) {
                    next();
                } else {
                    res.status(501).json({ 
                        message: 'Invalid Credientials'
                    })
                }
            }) 
            .catch(error => {
                res.status(500).json({
                    message: 'Ran into an unexptected error'
                })
            })
    } else {
        res.status(500).json({
            message: 'No credentials provided'
        });
    }
}