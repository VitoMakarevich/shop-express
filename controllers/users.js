const express = require('express');
// eslint-disable-next-line
const router = express.Router();
const {common: {wrapAsync}} = require('helpers');
const {common: {validate}} = require('middlewares');
const {user: userService} = require('services');
const {user: schema} = require('validators');

router.post('/',
  validate(schema.create),
  wrapAsync(async (req, res) => {
    let userFields = req.body;
    const createdUser = await userService.create(userFields);
    res.json(createdUser);
  })
);

router.post('/signIn',
  validate(schema.signIn),
  wrapAsync(async (req, res) => {
    const {name, password} = req.body;

    const {sessionId, user} = await userService.checkSignIn({name, password});

    res.clearCookie('session');
    res.cookie('session', sessionId);

    res.send(user);
  })
);

module.exports = router;
