'use strict';

exports.up = function(knex, Promise) {
  return knex.schema.createTable('users', (table) => {
    table.increments();
    table.string('first_name').notNullable().defaultTo('');
    table.string('last_name').notNullable().defaultTo('');
    table.string('email').notNullable().unique();
    table.string('github').unique();
    table.specificType('hashed_password', 'char(60)').notNullable();
    table.timestamps(true, true);
    table.string('avatar').notNullable();
    table.boolean('is_developer').notNullable().defaultTo(false);
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('users')
};
