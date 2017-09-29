'use strict'


if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

const express = require('express')
const path = require('path')
const logger = require('morgan')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')

const app = express()
app.disable('x-powered-by')

//add routes
const index = require('./routes/index')

app.use(logger('dev'))
app.use(bodyParser.json())
app.use(cookieParser())
app.use(express.static(path.join(__dirname, '/../client')))


//add things like app.use('/api/v1', index ==> for all the routes)
app.use('*', function(req, res) {
  res.sendFile('index.html', {
    root: path.join(__dirname, '/../client')
  })
})

app.use((err, _req, res, _next) => {
  if (err.output && err.output.statusCode) {
    return res
      .status(err.output.statusCode)
      .set('Content-Type', 'text/plain')
      .send(err.message);
  }
  // if (req.app.get('env') === 'development') {
  //   response.stack = err.stack
  // }
  res.sendStatus(err.status || 500);
});

module.exports = app
