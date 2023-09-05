/* eslint-disable no-restricted-syntax */
const express = require('express');
const SavedRecipes = require('../schemas/savedRecipes');

const router = express.Router();

const getTotalDaily = ({ recipesByDate, mainNutrients }) => {
  let totalDailyByDate = [];
  for (const savedRecipe of recipesByDate) {
    for (const mainNutrient of mainNutrients) {
      const idx = totalDailyByDate.findIndex(
        (daily) => daily.label === mainNutrient,
      );

      if (idx < 0) {
        totalDailyByDate = [
          ...totalDailyByDate,
          {
            label: mainNutrient,
            quantity: savedRecipe.recipe.totalDaily.find(
              (daily) => daily.label === mainNutrient,
            ).quantity,
          },
        ];
      } else {
        totalDailyByDate[idx].quantity += savedRecipe.recipe.totalDaily.find(
          (daily) => daily.label === mainNutrient,
        ).quantity;
      }
    }
  }

  return totalDailyByDate;
};

const getTotalNutrients = ({ recipesByDate, mainNutrients }) => {
  let totalNutrientsByDate = [];
  for (const savedRecipe of recipesByDate) {
    for (const mainNutrient of mainNutrients) {
      const idx = totalNutrientsByDate.findIndex(
        (daily) => daily.label === mainNutrient,
      );
      if (idx < 0) {
        totalNutrientsByDate = [
          ...totalNutrientsByDate,
          {
            label: mainNutrient,
            quantity: savedRecipe.recipe.totalNutrients.find(
              (daily) => daily.label === mainNutrient,
            ).quantity,
            unit: savedRecipe.recipe.totalNutrients.find(
              (daily) => daily.label === mainNutrient,
            ).unit,
          },
        ];
      } else {
        totalNutrientsByDate[idx].quantity +=
          savedRecipe.recipe.totalNutrients.find(
            (daily) => daily.label === mainNutrient,
          ).quantity;
      }
    }
  }

  return totalNutrientsByDate;
};

const getSavedRecipesByDateandEmail = (recipesByDate) => {
  const mainNutrients = ['Energy', 'Fat', 'Carbs', 'Protein'];

  const totalDailyByDate = getTotalDaily({ recipesByDate, mainNutrients });
  const totalNutrientsByDate = getTotalNutrients({
    recipesByDate,
    mainNutrients,
  });

  return {
    recipesByDate,
    totalDailyByDate,
    totalNutrientsByDate,
  };
};

// get recipes saved by user
router.get('/:userId/recipes', async (req, res) => {
  try {
    const { date } = req.query;
    const { userId } = req.params;
    if (!date) {
      const savedRecipes = await SavedRecipes.find({ userId });
      return res.status(200).json(savedRecipes);
    }

    const searchDate = new Date(date);

    const y = searchDate.getUTCFullYear();
    const m = searchDate.getUTCMonth();
    const d = searchDate.getUTCDate();

    const startDate = new Date(y, m, d);
    const endDate = new Date(y, m, d + 1);

    const savedRecipes = await SavedRecipes.find({
      userId,
      savedAt: {
        $gte: startDate,
        $lt: endDate,
      },
    });

    const savedRecipesByDate = getSavedRecipesByDateandEmail(savedRecipes);
    return res.status(200).json(savedRecipesByDate);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
});

// save recipe
router.post('/', async (req, res) => {
  try {
    const { recipe, savedAt, userId } = req.body;
    const savedRecipe = await SavedRecipes.create({
      userId,
      recipe,
      savedAt,
    });

    res.status(201).send({ message: 'Recipe saved successfully', savedRecipe });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: 'Internal server error' });
  }
});

// delete recipe
router.delete('/:savedRecipeId', async (req, res) => {
  try {
    const { savedRecipeId } = req.params;

    const result = await SavedRecipes.deleteOne({ _id: savedRecipeId });

    if (result.deletedCount === 1) return res.sendStatus(200);
    return res.status(404).json({ message: 'Saved recipe not found' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;
