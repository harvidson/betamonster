'use strict';

exports.up = function(knex, Promise) {
  return knex.schema.createTable('reviews_questions' (table) => {
    table.increments();
    table.integer('review_id')
      .notNullable()
      .references('id')
      .inTable('reviews')
      .onDelete('CASCADE')
      .index();
    table.integer('question_id')
      .notNullable()
      .references('id')
      .inTable('questions')
      .onDelete('CASCADE')
      .index();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('reviews_questions');
};
