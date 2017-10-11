'use strict';

exports.up = function(knex, Promise) {
  return knex.schema.createTable('projects', (table) => {
    table.increments();
    table.string('title').notNullable().unique();
    table.integer('user_id')
      .notNullable()
      .references('id')
      .inTable('users')
      .onDelete('CASCADE')
      .index();
    table.string('link').notNullable();
    table.string('github');
    table.text('description').notNullable();
    table.integer('readiness').notNullable().defaultTo(1);
    table.string('image').notNullable();
    table.boolean('published').defaultTo(false);
    table.timestamp('deleted_at').defaultTo(null);
    table.timestamps(true, true)
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('projects')
};
