'use strict';

const reviewsQuestionsList = [
  { id: 1,
    review_id: 1,
    question_id: 1
  },
  { id: 2,
    review_id: 2,
    question_id: 2
  },
  { id: 3,
    review_id: 3,
    question_id: 3
  },
  { id: 4,
    review_id: 4,
    question_id: 1
  },

]


exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('reviews_questions').del()
    .then(function () {
      // Inserts seed entries
      return knex('reviews_questions').insert(
        reviewsQuestionsList
      );
    })
    .then(() => {
      return knex.raw("SELECT setval('reviews_questions_id_seq', (SELECT MAX(id) FROM reviews_questions));")
    })
};
