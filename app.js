// here I am requiring the express app and
// putting it in a variabled called app

const express = require('express');
const app = express();

// Here I am putting requiring the json data
// and putting it in a variable

const data = require('./data.json').data;
const projects = data.projects;

const port = process.env.PORT || 8080;

// pug template

app.set('view engine', 'pug');

// static server for html and css files

app.use(express.static(__dirname + '/public'));

// This sets the routes for the homepage, about and index

app.get('/', (req, res) => {
  res.render('index', { projects });
});

app.get('/about', (req, res) => {
  res.render('about');
});

// dynamic routes to my projects //

app.get('/project/:id', (req, res) => {
  const projectId = req.params.id;
  const selectedProject = projects.find(({ id }) => id === +projectId);
  if (selectedProject) {
    res.render('project', { selectedProject });
  } else {
    res.sendStatus(404);
  }
});

// error handling //

const errorObject = (req, res, next) => {
  const err = new Error('err');
  err.status = 404;
  err.message = 'Oops cant find that project';
  next(err);
};

const errorHandler = (err, req, res, next) => {
  res.render('error', { err });
  return console.log(
    'There is an error, we cant find the page you are looking for '
  );
};

app.use(errorObject);
app.use(errorHandler);

// This makes the server listen so I can test it in the browser //

app.listen(port, () => {
  console.log('listening on port 8080');
});

module.exports = app;
