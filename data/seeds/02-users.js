
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('users').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {users_name: 'John', password:'strongPW', department_id: 1},
        {users_name: 'Greg',password: 'anotherPW', department_id: 2}
      ]);
    });
};
