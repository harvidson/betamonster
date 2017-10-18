'use strict';

const express = require('express')
const knex = require('../knex')
const boom = require('boom');
const jwt = require('jsonwebtoken');
const {
  camelizeKeys,
  decamelizeKeys
} = require('humps');
const ToneAnalyzerV3 = require('watson-developer-cloud/tone-analyzer/v3');

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

//get a review by id (note: "reviewId below refers to answerId")
router.get('/:id', (req, res, next) => {
  const reviewId = Number.parseInt(req.params.id);

  if (Number.isNaN(reviewId) || reviewId < 0) {
    return next(boom.create(404, 'Not found.'));
  }

  knex('answers')
    .where('id', reviewId)
    .first()
    .then((review) => {
      res.send(review)
    })
    .catch((err) => {
      console.log(err);
      return next(boom.create(500, 'Internal server error from /reviews/:id GET.'))
    });
})





module.exports = router
