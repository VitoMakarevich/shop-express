process.on('unhandledRejection', (code, error) => {
  console.error(code, error);
});

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const {
  error: errorMiddlewares,
} = require('middlewares');
const controllers = require('./controllers');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser());

app.use(controllers);

app.use(errorMiddlewares.generalErrorMiddleware());

module.exports = app;
