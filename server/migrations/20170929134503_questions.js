'use strict';

exports.up = function(knex, Promise) {
  return knex.schema.createTable('questions', (table) => {
    table.increments();
    table.text('question').notNullable();
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('questions')
};
