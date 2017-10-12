'use strict';

const reviewList = [
  {
    id: 1,
    project_id: 1,
    created_at: new Date('2017-09-03 14:26:16 UTC'),
    updated_at: new Date('2017-09-03 14:26:16 UTC'),
    deactivated_at: null
  },
  {
    id: 2,
    project_id: 2,
    created_at: new Date('2017-09-13 14:26:16 UTC'),
    updated_at: new Date('2017-09-13 14:26:16 UTC'),
    deactivated_at: null
  },
  {
    id: 3,
    project_id: 3,
    created_at: new Date('2017-09-23 14:26:16 UTC'),
    updated_at: new Date('2017-09-23 14:26:16 UTC'),
    deactivated_at: null
  }
]


exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('reviews').del()
    .then(function () {
      // Inserts seed entries
      return knex('reviews').insert(
        reviewList
      );
    })
    .then(() => {
      return knex.raw("SELECT setval('reviews_id_seq', (SELECT MAX(id) FROM reviews));")
    })
};
