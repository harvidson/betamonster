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

//get all current, published projects, along with developer name and email
router.get('/', (req, res, next) => {
  const promises = [];
  let projects;


  knex('projects')
    .where({
      published: true,
      deleted_at: null
    })
    .then((projectData) => {
      projects = projectData;

      //get user data on developer for each project
      for (const project of projects) {
        promises.push(promisifyProject(project))
      }
      return Promise.all(promises);
    })
    .then((projectData) => {
      for (let i = 0; i < projectData.length; i++) {
        projects[i].developerFirstName = projectData[i].first_name;
        projects[i].developerLastName = projectData[i].last_name;
        projects[i].developerEmail = projectData[i].email;
      }
    })
    .then(() => {
      console.log(projects);
      res.send(projects)
    })
    .catch((err) => {
      console.log(err);
      return next(boom.create(500, 'Internal server error from /projects GET.'))
    });

  function promisifyProject(project) {
    return new Promise((resolve, reject) => {
      knex('users')
        .where('id', project.user_id)
        .select('first_name', 'last_name', 'email')
        .then((data) => {
          resolve(data[0]);
        })
        .catch((err) => {
          reject(err);
        })
    })
  }
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
  let answers;
  const promises = [];

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
      // TODO: revise so that site can accomodate multiple batches of reviews
      return knex('reviews')
        .where('project_id', projectId)
        .first()
    })
    .then((review) => {
      return knex('reviews_questions')
        .where('review_id', review.id)
        .first()
    })
    .then((row) => {
      return knex('answers')
        .where('review_question_id', row.id)
    })
    .then((answerData) => {
      answers = answerData;

      //get user data on reviewer for each review in answers
      for (const answer of answers) {
        promises.push(promisifyReview(answer))
      }
      return Promise.all(promises);
    })
    .then((reviewerData) => {
      for (let i = 0; i < reviewerData.length; i++) {
        answers[i].reviewerFirstName = reviewerData[i].first_name;
        answers[i].reviewerLastName = reviewerData[i].last_name;
        answers[i].reviewerEmail = reviewerData[i].email;
      }
    })
    .then(() => {
      res.send(answers)
    })
    .catch((err) => {
      console.log(err);
      return next(boom.create(500, 'Internal server error from /projects/:id/reviews GET.'))
    });

  function promisifyReview(answer) {
    return new Promise((resolve, reject) => {
      knex('users')
        .where('id', answer.user_id)
        .select('first_name', 'last_name', 'email')
        .then((data) => {
          resolve(data[0]);
        })
        .catch((err) => {
          reject(err);
        })
    })
  }
})

//post a new review to db; run Watson tone analysis on review's way in (note: "review" here refers to row in "answers" table)
router.post('/:id/reviews', authorize, (req, res, next) => {
  const projectId = Number.parseInt(req.params.id);
  console.log(req.body.answer);
  const watsonText = req.body.title + req.body.answer;
  let watsonObj;

  if (Number.isNaN(projectId) || projectId < 0) {
    return next(boom.create(404, 'Not found.'));
  }

  analyzeTone(watsonText)
  .then((data) => {
    watsonObj = data;
    console.log('data from Wastson call ', JSON.parse(data));
    console.log('raw Watson data ', data);
    return knex('reviews')
      .where('project_id', projectId)
      .first()
    })
    .then((review) => {
      return knex('reviews_questions')
      .where('review_id', review.id)
      .first()
    })
    .then((row) => {
      return knex('answers')
      .insert({
        user_id: req.claim.userId,
        review_question_id: row.id,
        title: req.body.title,
        answer: req.body.answer,
        contact_okay: req.body.contactOkay,
        watson_analysis: watsonObj
      }, '*')
    })
    .then((newReview) => {
      console.log(newReview);
      res.send(newReview)
    })
    .catch((err) => {
      console.log(err);
      return next(boom.create(500, 'Internal server error from /projects/:id/reviews POST.'))
    });

  function analyzeTone(text) {
    return new Promise((resolve, reject) => {
      const tone_analyzer = new ToneAnalyzerV3({
        username: process.env.WatsonUsername,
        password: process.env.WatsonPassword,
        version_date: '2017-10-13'
      });

      const params = {
        text: text,
        tones: 'emotion, language, social',
        sentences: false
      };

      tone_analyzer.tone(params, function(error, response) {
        if (error) {
          console.log('error:', error);
          reject(error)
        } else {
          resolve(JSON.stringify(response, null, 2))
          console.log(JSON.stringify(response, null, 2));
        }
      })
    })
  }

})


//json.parse



module.exports = router
