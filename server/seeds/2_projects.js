'use strict';

const projectList = [
  {
    id: 1,
    title: 'The Onion',
    user_id: 3,
    link: 'http://www.theonion.com/',
    description: 'Tell him I was too fucking busy-- or vice versa.',
    readiness: 8,
    image: 'http://lorempixel.com/400/200/',
    published: true,
    deleted_at: null,
    created_at: new Date('2017-09-02 14:26:16 UTC'),
    updated_at: new Date('2017-09-02 14:26:16 UTC')
  },
  {
    id: 2,
    title: 'Politifact',
    user_id: 4,
    link: 'http://www.politifact.com/',
    description: 'The apparition of these faces in the crowd; Petals on a wet black bough.',
    readiness: 6,
    image: 'http://lorempixel.com/400/200/',
    published: true,
    deleted_at: null,
    created_at: new Date('2017-09-12 14:26:16 UTC'),
    updated_at: new Date('2017-09-12 14:26:16 UTC')
  },
  {
    id: 3,
    title: 'MyFashDiary',
    user_id: 2,
    link: 'http://myfashdiary.com/',
    description: 'Bright Young Things. Quel ennui.',
    readiness: 3,
    image: 'http://lorempixel.com/400/200/',
    published: true,
    deleted_at: null,
    created_at: new Date('2017-09-22 14:26:16 UTC'),
    updated_at: new Date('2017-09-22 14:26:16 UTC')
  }
]

exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('projects').del()
    .then(function () {
      // Inserts seed entries
      return knex('projects').insert(
        projectList
      );
    })
    .then(() => {
      return knex.raw("SELECT setval('projects_id_seq', (SELECT MAX(id) FROM projects));")
    });
};
