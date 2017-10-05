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

const router = express.Router()

//register a new user
router.post('/users', (req, res, next) => {
  console.log('inside post to users');
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
      console.log('hashed_password result: ', result);
      return knex('users')
        .insert({
          first_name: req.body.firstName,
          last_name: req.body.lastName,
          email: email,
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







 module.exports = router
