process.on('unhandledRejection', (code, error) => {
  console.error(code, error);
});

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const {
  common: commonMiddlewares,
  error: errorMiddlewares,
} = require('middlewares');
const controllers = require('./controllers');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser());
app.use(commonMiddlewares.appendSession);

app.use(controllers);

app.use(errorMiddlewares.generalErrorHandler());

module.exports = app;
