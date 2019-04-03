const db = require('../data/dbConfig.js');

module.exports = { 
    add,
    find,
    findById
};

function find() {
    return db('users').select('id', 'users_name', 'password', 'department_id');
}

async function add(user) {
    const [id] = await db('users').insert(user);

    return findById(id);
}

function findById(id) {
    return db('users').where({id}).fist();
}