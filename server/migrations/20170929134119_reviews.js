'use strict';

// TODO: use this table to allow user to seek additional batches of reviews for the same project

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
