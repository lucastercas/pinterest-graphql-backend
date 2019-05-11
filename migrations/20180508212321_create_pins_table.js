
exports.up = function(knex) {
  return knex.schema.createTable('pins', function (table) {
      table.string('id').primary();
      table.string('title');
      table.string('link');
      table.string('image');
      table
        .string('user_id')
        .references('id')
        .inTable('users')
        .onDelete('CASCADE')
        .onUpdate('CASCADE');
    })
};

exports.down = function(knex) {
  return knex.schema.dropTable('pins');
};
