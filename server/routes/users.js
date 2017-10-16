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
          github: req.body.github,
          is_developer: req.body.isDeveloper,
          avatar: `https://api.adorable.io/avatars/150/${email}`,
          hashed_password: result
        }, '*')
    })
    .then((newUser) => {
      let user = camelizeKeys(newUser[0]);
      delete user.hashedPassword;
      res.send(user);
    })
    .catch((err) => {
      console.log(err);
      return next(boom.create(500, 'Internal server error from /users POST.'))
    });
});

//get a single user
router.get('/:id', authorize, (req, res, next) => {
  const userId = Number.parseInt(req.params.id);

  if (Number.isNaN(userId) || userId < 0) {
    console.log('weird userId');
    return next(boom.create(404, 'Not found.'));
  }

  // check is self--req.claim.userId needs to equal :id
  if (userId !== req.claim.userId) {
    return next(boom.create(500, 'Internal server error.'))
  }

  knex('users')
    .where('id', userId)
    .first()
    .then((user) => {
      user = camelizeKeys(user)
      res.send(user)
    })
    .catch((err) => {
      return next(boom.create(500, 'Internal server error.'))
    });
});

//get all current projects submitted by a user, along with a count of reviews in for each one
router.get('/:id/projects', authorize, (req, res, next) => {
  const userId = Number.parseInt(req.params.id);

  if (Number.isNaN(userId) || userId < 0) {
    console.log('weird userId');
    return next(boom.create(404, 'Not found.'));
  }

  // check is self--req.claim.userId needs to equal :id
  if (userId !== req.claim.userId) {
    return next(boom.create(500, 'Internal server error.'))
  }

  // get all of the user's current projects, along with a count of reviews submitted for that project
  knex.raw(`SELECT projects.id, projects.title, projects.link, projects.description, projects.readiness, projects.image, projects.published, projects.created_at, projects.updated_at, count(answers.review_question_id) FROM projects LEFT JOIN reviews ON projects.id = reviews.project_id LEFT JOIN reviews_questions ON reviews.id = reviews_questions.review_id LEFT JOIN answers ON reviews_questions.id = answers.review_question_id WHERE projects.user_id = ${userId} AND projects.deleted_at IS null GROUP BY projects.id`)
    .then((myProjects) => {
      res.send(myProjects.rows)
    })
    .catch((err) => {
      console.log(err);
      return next(boom.create(500, 'Internal server error.'))
    });
})

//get all reviews submitted by a user (note: "reviews" here means "answers", unless it's a reference to the table called reviews)
router.get('/:id/reviews', authorize, (req, res, next) => {
  const userId = Number.parseInt(req.params.id);
  const promises = [];
  let reviews;

  if (Number.isNaN(userId) || userId < 0) {
    console.log('weird userId');
    return next(boom.create(404, 'Not found.'));
  }

  // check is self--req.claim.userId needs to equal :id
  if (userId !== req.claim.userId) {
    return next(boom.create(500, 'Internal server error.'))
  }

  knex('answers')
    .where({
      'user_id': userId,
      deleted_at: null
    })
    .then((reviewData) => {
      reviews = reviewData

      //get user project_id for each review
      for (const review of reviews) {
        promises.push(promisifyReview(review))
      }
      return Promise.all(promises);
    })
    .then((reviewData) => {
      for (let i = 0; i < reviewData.length; i++) {
        reviews[i].project_id = reviewData[i].id;
        reviews[i].project_title = reviewData[i].title;
        reviews[i].project_image = reviewData[i].image;
        reviews[i].project_link = reviewData[i].link;
      }
    })
    .then(() => {
      console.log(reviews);
      res.send(reviews)
    })
    .catch((err) => {
      console.log(err);
      return next(boom.create(500, 'Internal server error from /users/:id/reviews GET.'))
    })

    function promisifyReview(review) {
      return new Promise((resolve, reject) => {
          knex('reviews_questions')
            .where('id', review.review_question_id)
            .first()
            .then((row) => {
              return knex('reviews')
                .where('id', row.review_id)
                .select('project_id')
            })
            .then((data) => {
              console.log('review data from promisifyReview ', data[0]);
              return knex('projects')
              .where('id', data[0].project_id)
              .first()
            })
            .then((data) => {
              console.log('full data from promisifyReview ', data);
              resolve(data);
            })
            .catch((err) => {
              reject(err);
            })
      })
    }
})






module.exports = router
