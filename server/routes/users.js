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

//get all projects submitted by a user, along with a count of reviews in for each one
router.get('/:id/projects', authorize, (req, res, next) => {
  const userId = Number.parseInt(req.params.id);
  let numberReviews = 0;

  if (Number.isNaN(userId) || userId < 0) {
    console.log('weird userId');
    return next(boom.create(404, 'Not found.'));
  }

  // check is self--req.claim.userId needs to equal :id
  if (userId !== req.claim.userId) {
    return next(boom.create(500, 'Internal server error.'))
  }

  // knex('projects')
  //   .where('user_id', userId)
  //   .select('*')
  //   .leftJoin('reviews', 'project_id', 'projects.id')
  //
  //
  //   .then((myProjects) => {
  //     myProjects.map((project) => {
  //       // return countReviews(project.id)
  //       // .then((numberReviews) => {
  //       //   project.numberReviews = numberReviews;
  //       //
  //       // })
  //       return project
  //     })
  //     res.send(myProjects)
  //   })
  //   .catch((err) => {
  //     return next(boom.create(500, 'Internal server error.'))
  //   });

  knex.raw(`SELECT projects.id, projects.title, projects.link, projects.description, projects.readiness, projects.image, projects.published, projects.created_at, projects.updated_at, count(reviews.id) FROM projects LEFT JOIN reviews ON projects.id = reviews.project_id WHERE projects.user_id = ${userId} GROUP BY projects.id`)
  .then((myProjects) => {
    res.send(myProjects.rows)
  })
  .catch((err) => {
    console.log(err);
    return next(boom.create(500, 'Internal server error.'))
  });

  //
  // function countReviews(projectId) {
  //   return knex('reviews')
  //     .where('project_id', projectId)
  //     .then((reviews) => {
  //       console.log('reviews.length ', reviews.length);
  //       return reviews.length
  //
  //     })
  // }
})





 module.exports = router
