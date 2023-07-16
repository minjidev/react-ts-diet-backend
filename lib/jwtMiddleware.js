const jwt = require('jsonwebtoken');
/**
 * 401 에러는 유효하지 않은 인증 토큰일 경우 반환하고
 * 403 에러는 토큰은 있지만, 그 토큰을 받은 유저가 scope 가 부족할 때 반환하는 것이다.
 */

const jwtMiddleware = (req, res, next) => {
  const accessToken = req.headers.authorization || req.cookies.accessToken;

  // 토큰 없는 경우 처리 -> 401 에러 (권한 거절)
  if (!accessToken) return res.sendStatus(401);

  // 토큰 있는 경우 토큰 검증(verify)
  try {
    const data = jwt.verify(accessToken, process.env.JWT_SECRET_KEY);

    req.user = {
      _id: data.id,
      email: data.email,
      username: data.username,
    };

    return next();
  } catch (error) {
    console.error(error);
    return res.sendStatus(401);
  }
};

module.exports = jwtMiddleware;
