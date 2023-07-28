const express = require('express');
const users = require('../models/users');
const recipes = require('../models/recipes');

const router = express.Router();

// 회원가입 : 유저 닉네임, 이메일 중복 확인 -> 없으면 createUser
router.post('/signup', (req, res) => {
  const { email, password, username } = req.body;

  const newUser = { email, password, username };
  users.createUser(newUser);

  res.send({
    message: 'Signed up succesfully !',
  });
});

// 로그인 : 유저 id, pw 일치하지 않으면 에러(401) -> 있으면 토큰 발급 & 쿠키에 저장
router.post('/signin', (req, res) => {
  const { email, password } = req.body;

  const user = users.getUserByEmailPw({ email, password });

  // 401: Unauthorized
  if (!user) {
    res.sendStatus(401).send({ error: 'Email or password incorrect' });
  }

  // 토큰 생성
  const accessToken = users.generateToken({ email, password });
  const savedRecipes = recipes.getSavedRecipesByEmail(email);

  // 쿠키에 저장
  res
    .cookie('accessToken', accessToken, {
      maxAge: 1000 * 60 * 60 * 24 * 7,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
    })
    .status(200)
    .send({
      user: { email, username: user.username, savedRecipes },
      message: 'Logged in succesfully !',
    });
});

router.post('/signout', (req, res) => {
  res
    .clearCookie('accessToken')
    .status(200)
    .send({ messsage: 'Successfully logged out ' });
});

router.post('/email-check', (req, res) => {
  const { email } = req.body;

  const isEmailDuplicated = users.checkEmailDuplicated(email);

  if (isEmailDuplicated) {
    return res.status(409).send({ message: 'Email already exists' });
  }

  return res.sendStatus(200);
});

router.post('/username-check', (req, res) => {
  const { username } = req.body;

  const isUsernameDuplicated = users.checkUsernameDuplicated(username);
  if (isUsernameDuplicated) {
    return res.status(409).send({ message: 'Username already Exists' });
  }

  return res.sendStatus(200);
});

module.exports = router;
