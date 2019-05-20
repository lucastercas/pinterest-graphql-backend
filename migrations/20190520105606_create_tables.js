exports.up = function(knex, Promise) {
  return knex.schema
    .createTable('users', function(table) {
      table.string('id').primary()
      table.string('email')
      table.string('username')
  })
  .createTable('pins', function(table) {
    table.string('id').primary()
    table.string('title')
    table.string('image')
    table.string('user_id')
      .references('id')
      .inTable('users')
      .onDelete('CASCADE')
      .onUpdate('CASCADE')
  })
  .createTable('comments', function(table) {
    table.string('user_id').primary()
      .references('id')
      .inTable('users')
    table.string('pin_id').primary()
      .references('id')
      .inTable('pins')
    table.string('content')
    
  })


  
};

exports.down = function(knex, Promise) {
  return knex.schema
    .dropTable('comments')
    .dropTable('pins')
    .dropTable('users')
  
};
