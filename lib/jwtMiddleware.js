const jwt = require('jsonwebtoken');
const recipes = require('../models/recipes');

const jwtMiddleware = (req, res, next) => {
  const accessToken = req.headers.authorization || req.cookies.accessToken;

  if (!accessToken) {
    return next();
  }

  try {
    const data = jwt.verify(accessToken, process.env.JWT_SECRET_KEY);
    const savedRecipes = recipes.getSavedRecipesByEmail(data.email);

    req.user = {
      _id: data.id,
      email: data.email,
      username: data.username,
      savedRecipes,
    };

    return next();
  } catch (error) {
    console.error('Auth Error..!');

    return next();
  }
};

module.exports = jwtMiddleware;
