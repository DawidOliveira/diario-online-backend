
exports.up = function(knex) {
  return knex.schema.createTable('notes', table => {
    table.increments('id').primary()
    table.text('text')
    
    table.timestamp('createdAt').defaultTo(knex.fn.now());
    table.timestamp('updatedAt').defaultTo(knex.fn.now());
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable('notes')
};
