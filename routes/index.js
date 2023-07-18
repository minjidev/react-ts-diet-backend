// 라우팅
const express = require('express');

const router = express.Router();

const auth = require('./auth');
const recipes = require('./recipe');

router.use('/auth', auth);
router.use('/recipes', recipes);

module.exports = router;
