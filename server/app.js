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

app.use(logger('dev'))
app.use(bodyParser.json())
app.use(cookieParser())
app.use(express.static(path.join(__dirname, '/../client')))
app.use(express.static(path.join(__dirname, '/../', 'node_modules')))

app.use('/api/token', require('./routes/token'))
app.use('/api/users', require('./routes/users'))
app.use('/api/projects', require('./routes/projects'))
app.use('/api/reviews', require('./routes/reviews'))

app.use('*', function(req, res) {
  console.log('route not found');
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
