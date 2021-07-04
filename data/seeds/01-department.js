
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('department').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('department').insert([
        {department_name: 'teller'},
        {department_name: 'doctor'},
      ]);
    });
};
