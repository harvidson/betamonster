'use strict';

const express = require('express')
const knex = require('../knex')
const bcrypt = require('bcrypt-as-promised');
const boom = require('boom');
const { camelizeKeys } = require('humps');
const jwt = require('jsonwebtoken');

const router = express.Router()

//check that user has cookie: returns T or F

// **need to make a .env file
router.get('/token', (req, res, next) => {
  jwt.verify(req.cookies.token, process.env.JWT_KEY, (err, payload) => {
    if (err) {
      return res.send({
        result: false
      });
    }
    return res.send({
      result: true,
      userId: payload.userId
    });
  });
});

//on login, check email and password credentials
router.post('/token', (req, res, next) => {


})



 module.exports = router
