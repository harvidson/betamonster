'use strict';

const usersList = [
  { id: 1,
    first_name: 'Snooty',
    last_name: 'Baronet',
    email: 'snoots@behavior.com',
    hashed_password: '$2a$12$oEnJjrb2XsPOTGhrn0o21.Ck5qiOXF4OIXes1rjCrbQJlRlSwoTVW', //failbetter
    avatar: 'https://api.adorable.io/avatars/200/snoots@behavior.com.png',
    is_developer: false
  },
  {
    id: 2,
    first_name: 'Iris',
    last_name: 'Storm',
    email: 'flapper@hispanosuiza.com',
    hashed_password: '$2a$12$oEnJjrb2XsPOTGhrn0o21.Ck5qiOXF4OIXes1rjCrbQJlRlSwoTVW', //failbetter
    avatar: 'https://api.adorable.io/avatars/200/flapper@hispanosuiza.com.png',
    is_developer: true
  },
  {
    id: 3,
    first_name: 'Dorothy',
    last_name: 'Parker',
    email: 'dorothy@freshhell.com',
    hashed_password: '$2a$12$oEnJjrb2XsPOTGhrn0o21.Ck5qiOXF4OIXes1rjCrbQJlRlSwoTVW', //failbetter,
    avatar: 'https://api.adorable.io/avatars/200/dorothy@freshhell.com.png',
    is_developer: true
  },
  {
    id: 4,
    first_name: 'Ezra',
    last_name: 'Pound',
    email: 'leadingback@splendor.com',
    hashed_password: '$2a$12$oEnJjrb2XsPOTGhrn0o21.Ck5qiOXF4OIXes1rjCrbQJlRlSwoTVW', //failbetter,
    avatar: 'https://api.adorable.io/avatars/200/leadingback@splendor.com.png',
    is_developer: true
  }

]

exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert(
        usersList
      );
    })
    .then(() => {
      return knex.raw("SELECT setval('users_id_seq', (SELECT MAX(id) FROM users));")
    })
};
