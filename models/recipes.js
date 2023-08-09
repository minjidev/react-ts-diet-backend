/* eslint-disable no-restricted-syntax */

let recipes = [];
const createRecipeId = () =>
  Math.max(...recipes.map((recipe) => recipe.recipeId), 0) + 1;

const createSavedRecipe = (newlySavedRecipe) => {
  recipes = [...recipes, newlySavedRecipe];

  return newlySavedRecipe;
};

const getSavedRecipesByEmail = (email) =>
  recipes.filter((recipe) => recipe.user === email);

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

const isSameDate = (date1, date2) =>
  date1.getFullYear() === date2.getFullYear() &&
  date1.getMonth() === date2.getMonth() &&
  date1.getDate() === date2.getDate();

const getSavedRecipesByDateandEmail = ({ email, date }) => {
  const mainNutrients = ['Energy', 'Fat', 'Carbs', 'Protein'];

  const recipesByDate = recipes.filter(
    (recipe) =>
      recipe.user === email &&
      isSameDate(new Date(recipe.date), new Date(date)),
  );

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

const deleteRecipesByRecipeId = (recipeId) => {
  recipes = recipes.filter((saved) => saved.recipe.recipeId !== recipeId);

  console.log('recipes: ', recipes);
};

module.exports = {
  recipes,
  createRecipeId,
  createSavedRecipe,
  getSavedRecipesByEmail,
  getSavedRecipesByDateandEmail,
  deleteRecipesByRecipeId,
};
