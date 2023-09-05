const mongoose = require('mongoose');
const { recipeSchema } = require('./recipes');

const { Schema } = mongoose;
const {
  Types: { ObjectId },
} = Schema;

const savedRecipesSchema = new Schema({
  userId: {
    type: ObjectId,
    ref: 'User',
    required: true,
  },
  recipe: {
    type: recipeSchema,
    required: true,
  },
  savedAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('savedRecipes', savedRecipesSchema);
