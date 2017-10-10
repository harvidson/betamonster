'use strict';

const express = require('express')
const knex = require('../knex')
const bcrypt = require('bcrypt-as-promised');
const boom = require('boom');
const jwt = require('jsonwebtoken');
const {
  camelizeKeys,
  decamelizeKeys
} = require('humps');

const router = express.Router();

const authorize = function(req, res, next) {
  jwt.verify(req.cookies.token, process.env.JWT_KEY, (err, payload) => {
    if (err) {
      return next(boom.create(401, 'Unauthorized.'));
    }
    req.claim = payload;
    next();
  });
};

//register a new user
router.post('/', (req, res, next) => {
  //check to see whether user exists
  knex('users')
    .where('email', req.body.email)
    .first()
    .then((row) => {
      if (row) {
        return next(boom.create(500, 'That email is already registered with a Betamonster account.'))
      }
      //hash password for new users
      return bcrypt.hash(req.body.password, 12)
    })
    .then((result) => {
      const email = req.body.email;
      return knex('users')
        .insert({
          first_name: req.body.firstName,
          last_name: req.body.lastName,
          email: email,
          is_developer: req.body.isDeveloper,
          avatar: `https://api.adorable.io/avatars/150/${email}`,
          hashed_password: result
        }, '*')
    })
    .then((newUser) => {
      let user = camelizeKeys(newUser[0]);
      console.log(user);
      delete user.hashedPassword;
      res.send(user);
    })
    .catch((err) => {
      console.log(err);
      return next(boom.create(500, 'Internal server error from /users POST.'))
    });
});

//get a single user
router.get('/:id', (req, res, next) => {
  const userId = Number.parseInt(req.claim.userId);

  console.log('userId ' + userId);

  if (Number.isNaN(userId) || userId < 0) {
    console.log('weird userId');
    return next(boom.create(404, 'Not found.'));
  }

  //check is self--req.claim.userId needs to equal :id
  // if (userId !== req.claim.userId) {
  //   return next(boom.create(500, 'Internal server error.'))
  // }

  knex('users')
    .where('id', userId)
    .select('is_developer')
    .first()
    .then((isDev) => {
      res.send(isDev)
    })
    .catch((err) => {
      return next(boom.create(500, 'Internal server error.'))
    });
});







 module.exports = router
