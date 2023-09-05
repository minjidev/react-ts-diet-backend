const jwt = require('jsonwebtoken');

const jwtMiddleware = (req, res, next) => {
  const accessToken = req.headers.authorization || req.cookies.accessToken;

  if (!accessToken) {
    return next();
  }

  try {
    jwt.verify(accessToken, process.env.JWT_SECRET_KEY);

    return next();
  } catch (error) {
    console.error('JWT Verification Error:', error.message);

    // return res.status(401).json({ error: 'Unauthorized' });
    return next();
  }
};

module.exports = jwtMiddleware;
