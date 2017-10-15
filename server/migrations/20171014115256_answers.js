
exports.up = function(knex, Promise) {
  return knex.schema.alterTable('answers', (table) => {
    table.json('watson_analysis').alter();
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('answers')
};
