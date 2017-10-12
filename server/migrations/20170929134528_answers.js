'use strict';

exports.up = function(knex, Promise) {
  return knex.schema.createTable('answers', (table) => {
    table.increments();
    table.integer('review_question_id')
      .notNullable()
      .references('id')
      .inTable('reviews_questions')
      .onDelete('CASCADE')
      .index();
    table.integer('user_id')
      .notNullable()
      .references('id')
      .inTable('users')
      .onDelete('CASCADE')
      .index();
    table.text('title').notNullable();
    table.text('answer').notNullable();
    table.timestamps(true, true);
    table.timestamp('deleted_at').defaultTo(null);
    table.text('watson_analysis');
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('answers')
};
