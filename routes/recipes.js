const express = require('express');
const recipes = require('../models/recipes');

const router = express.Router();

router.post('/', (req, res) => {
  const { user, recipe, date, savedAt } = req.body;

  const savedRecipe = {
    recipeId: recipes.createRecipeId(),
    user: user.email,
    recipe,
    date,
    savedAt,
  };

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
  console.log('saved: ', savedRecipesByDate);
  res.send(savedRecipesByDate);
});

module.exports = router;
