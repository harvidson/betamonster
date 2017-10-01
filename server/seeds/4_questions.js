'use strict';

const questionList = [
  {
    id: 1,
    question: "Brevity is the soul of lingerie. And usability reviews."
  },
  {
    id: 2,
    question: "Tell me what you think, but pull down thy vanity, I say; pull down."
  },
  {
    id: 3,
    question: "I kindly request your opinion, pour le sport, old sport."
  }
]
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('questions').del()
    .then(function () {
      // Inserts seed entries
      return knex('questions').insert(
        questionList
      );
    })
    .then(() => {
      return knex.raw("SELECT setval('questions_id_seq', (SELECT MAX(id) FROM questions));")
    });
};
