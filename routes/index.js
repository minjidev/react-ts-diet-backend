// routing
const express = require('express');

const router = express.Router();

const auth = require('./auth');
const recipes = require('./recipes');
const users = require('./users');

router.use('/auth', auth);
router.use('/recipes', recipes);
router.use('/user', users);

module.exports = router;
