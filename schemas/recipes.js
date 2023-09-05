const mongoose = require('mongoose');

const { Schema } = mongoose;

const totalDailySchema = new Schema({
  label: String,
  quantity: Number,
});

const toatalNutrientsSchema = new Schema({
  label: String,
  quantity: Number,
  unit: String,
});

const recipeSchema = new Schema({
  recipeId: {
    type: String,
    required: true,
  },
  label: {
    type: String,
    required: true,
  },
  cuisinType: {
    type: [String],
    required: true,
  },
  dishType: {
    type: [String],
    required: true,
  },
  dietLabels: {
    type: [String],
    required: true,
  },
  healthLabels: {
    type: [String],
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  calories: {
    type: Number,
    required: true,
  },
  servings: {
    type: Number,
    required: true,
  },
  totalDaily: {
    type: [totalDailySchema],
    required: true,
  },
  totalNutrients: {
    type: [toatalNutrientsSchema],
    required: true,
  },
});

module.exports = { recipeSchema };
