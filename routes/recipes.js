const express = require('express');
const recipes = require('../models/recipes');

const router = express.Router();

router.post('/', (req, res) => {
  const savedRecipe = req.body;

  recipes.createSavedRecipe(savedRecipe);

  res.send({
    savedRecipe,
  });
});

router.get('/', (req, res) => {
  const { date } = req.query;
  const { email } = req.user;

  const savedRecipesByDate = recipes.getSavedRecipesByDateandEmail({
    date,
    email,
  });

  res.send(savedRecipesByDate);
});

module.exports = router;
