'use strict';

//this table is here so that a user will be able to seek additional batches of reviews for the same project (not yet implemented)

exports.up = function(knex, Promise) {
  return knex.schema.createTable('reviews', (table) => {
    table.increments()
    table.integer('project_id')
      .notNullable()
      .references('id')
      .inTable('projects')
      .onDelete('CASCADE')
      .index();
    table.timestamps(true, true);
    table.timestamp('deactivated_at').defaultTo(null);
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('reviews')
};
