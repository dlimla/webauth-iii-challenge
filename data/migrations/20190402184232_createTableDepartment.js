
exports.up = function(knex, Promise) {
    return knex.schema.createTable('department', table => {
        table.increments();
        table.string('department_name')
            .notNullable()
            .unique();
    });
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists('department');
};
