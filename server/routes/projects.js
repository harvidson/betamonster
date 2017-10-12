'use strict';

const express = require('express')
const knex = require('../knex')
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

//post a new review, as well as associated rows in reviews, questions, and reviews_questions tables
router.post('/', authorize, (req, res, next) => {
  console.log(req.body);
  let project;
  let review_id;

  // inside projects/ POST route
  //check to see whether there's already a project by that name in the database
  knex('projects')
    .where('title', req.body.title)
    .first()
    .then((row) => {
      if (row) {
        return next(boom.create(400, 'There\'s already a project by that name in the Betamonster database.'))
      }
      return knex('projects')
        .insert({
          title: req.body.title,
          user_id: req.claim.userId,
          link: req.body.link,
          // github: req.body.github,
          description: req.body.description,
          image: req.body.image,
          // TODO: add 'publish' feature
          published: true
        }, '*')
    })
    .then((newProject) => {
      console.log('newProject :', newProject);
      project = camelizeKeys(newProject[0]);
      console.log(project);

      //create new batch of reviews for this project
      return knex('reviews')
        .insert({
          project_id: project.id
        }, '*')

    })
    .then((review) => {
      console.log('review: ', review);
      review_id = review[0].id
      console.log('review_id ', review_id);
      //create new question for this project
      return knex('questions')
        .insert({
          question: req.body.questions
        }, '*')
    })
    .then((question) => {
      console.log('question: ', question);
      return knex('reviews_questions')
        .insert({
          review_id: review_id,
          question_id: question[0].id
        }, '*')
    })
    .then(() => {
      res.send(project);

    })
    .catch((err) => {
      console.log(err);
      return next(boom.create(500, 'Internal server error from /projects POST.'))
    });
})

router.get('/', (req, res, next) => {
  knex('projects')
    .where('published', true)
    .then((projects) => {
      res.send(projects)
    })
    .catch((err) => {
      console.log(err);
      return next(boom.create(500, 'Internal server error from /projects GET.'))
    });
})

router.get('/:id', authorize, (req, res, next) => {
  const projectId = Number.parseInt(req.params.id);
  console.log('looking for detail view of project ', projectId);

  if (Number.isNaN(projectId) || projectId < 0) {
    return next(boom.create(404, 'Not found.'));
  }

  knex('projects')
    .where('id', projectId)
    .first()
    .then((project) => {
      res.send(project)
    })
    .catch((err) => {
      console.log(err);
      return next(boom.create(500, 'Internal server error from /projects/:id GET.'))
    });
})

router.get('/:id/question', authorize, (req, res, next) => {
  const projectId = Number.parseInt(req.params.id);
  console.log('looking for detail view of project ', projectId);

  if (Number.isNaN(projectId) || projectId < 0) {
    return next(boom.create(404, 'Not found.'));
  }

  return knex('reviews')
    .where('project_id', projectId)
    //TODO: revise this to allow for multiple review batches to be submitted for one project; needs to return multiple rows, then use a map function in next .then to grab all the questions
    .first()
    .then((review) => {
      console.log('review ', review);
      console.log('review.id ', review.id);


      return knex('reviews_questions')
      .where('review_id', review.id)
      .first()
    })
    .then((row) => {
      console.log('row ', row);

      return knex('questions')
      .where('id', row.question_id)
      .first()
    })
    .then((question) => {
      console.log('question ', question);
      res.send(question)
    })
    .catch((err) => {
      console.log(err);
      return next(boom.create(500, 'Internal server error from /projects/:id/question GET.'))
    });
})




 module.exports = router
