
exports.up = function(knex, Promise) {
    return knex.schema.createTable('users', table => {
        table.increments();
        table.string('users_name')
            .notNullable()
            .unique();
        table.string('password')
            .notNullable()
            .unique();
        table.integer('department_id')
            .unsigned()
            .references('id')
            .inTable('department')
            .onDelete('CASCADE')
            .onUpdate('CASCADE')
    })
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists('users');
};
