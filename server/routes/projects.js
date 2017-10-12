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

//post a new project, as well as associated rows in reviews, questions, and reviews_questions tables
router.post('/', authorize, (req, res, next) => {
  let project;
  let review_id;

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
      project = camelizeKeys(newProject[0]);

      //create new batch of reviews for this project
      return knex('reviews')
        .insert({
          project_id: project.id
        }, '*')

    })
    .then((review) => {
      review_id = review[0].id
      //create new question for this project
      return knex('questions')
        .insert({
          question: req.body.questions
        }, '*')
    })
    .then((question) => {
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

//get all current, published projects
router.get('/', (req, res, next) => {
  knex('projects')
    .where({
      published: true,
      deleted_at: null
    })
    .then((projects) => {
      res.send(projects)
    })
    .catch((err) => {
      console.log(err);
      return next(boom.create(500, 'Internal server error from /projects GET.'))
    });
})

//get a specific project by id
router.get('/:id', (req, res, next) => {
  const projectId = Number.parseInt(req.params.id);

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

//get the question associated with a project with id
router.get('/:id/question', (req, res, next) => {
  const projectId = Number.parseInt(req.params.id);

  if (Number.isNaN(projectId) || projectId < 0) {
    return next(boom.create(404, 'Not found.'));
  }

  return knex('reviews')
    .where('project_id', projectId)
    //TODO: revise this to allow for multiple review batches to be submitted for one project; needs to return multiple rows, then use a map function in next .then to grab all the questions
    .first()
    .then((review) => {
      return knex('reviews_questions')
      .where('review_id', review.id)
      .first()
    })
    .then((row) => {
      return knex('questions')
      .where('id', row.question_id)
      .first()
    })
    .then((question) => {
      res.send(question)
    })
    .catch((err) => {
      console.log(err);
      return next(boom.create(500, 'Internal server error from /projects/:id/question GET.'))
    });
})

router.delete('/:id', authorize, (req, res, next) => {
  const projectId = Number.parseInt(req.params.id);

  if (Number.isNaN(projectId) || projectId < 0) {
    return next(boom.create(404, 'Not found.'));
  }

  knex('projects')
    .where('id', projectId)
    .first()
    .then((project) => {
      //check whether project belongs to current user
      if (!project || project.user_id !== req.claim.userId) {
        return next(boom.create(400, 'Bad request.'))
      }

      return knex('projects')
        .where('id', projectId)
        .update({
          deleted_at: new Date()
        }, '*')
    })
    .then((project) => {
      delete project.id;
      delete project.user_id;
      res.send(project)
    })
    .catch((err) => {
      console.log(err);
      return next(boom.create(500, 'Internal server error from /projects/:id DELETE.'))
    });
})

router.get('/:id/reviews', authorize, (req, res, next) => {
  const projectId = Number.parseInt(req.params.id);

  if (Number.isNaN(projectId) || projectId < 0) {
    return next(boom.create(404, 'Not found.'));
  }

  knex('projects')
    .where('id', projectId)
    .first()
    .then((project) => {
      console.log('project ', project);
      //check whether project belongs to current user
      if (!project || project.user_id !== req.claim.userId) {
        return next(boom.create(400, 'Bad request.'))
      }
      // TODO: revise so that site can accomodate multiple batches of reviews
      return knex('reviews')
      .where('project_id', projectId)
      .first()
    })
    .then((review) => {
      console.log('review ', review);
      return knex('reviews_questions')
      .where('review_id', review.id)
      .first()
    })
    .then((row) => {
      console.log('reviews_questions row ', row);
      return knex('answers')
      .where('review_question_id', row.id)
    })
    .then((answers) => {
      console.log(answers);
      res.send(answers)
    })
    .catch((err) => {
      console.log(err);
      return next(boom.create(500, 'Internal server error from /projects/:id/reviews GET.'))
    });

})


 module.exports = router
