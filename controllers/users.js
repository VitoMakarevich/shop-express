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

module.exports = router;
