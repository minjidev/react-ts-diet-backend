const express = require('express');
const jwt = require('jsonwebtoken');
const Users = require('../schemas/users');

const router = express.Router();

// Register
router.post('/signup', async (req, res) => {
  const { email, password, username } = req.body;

  const newUser = { email, password, username };
  await Users.create(newUser);

  res.json({
    message: 'Signed up succesfully !',
  });
});

// LogIn : if user id, pw not match(401) -> if matches, issue token & save in cookie
router.post('/signin', async (req, res) => {
  const { email, password } = req.body;
  // console.log('email: ', email, password);
  const user = await Users.findOne({ email, password });

  // 401: Unauthorized
  if (!user) {
    return res.status(401).send({ error: 'Email or password incorrect' });
  }

  // create token
  const accessToken = jwt.sign(
    { email, password },
    `${process.env.JWT_SECRET_KEY}`,
    {
      expiresIn: '7d',
    },
  );

  // save in cookie
  return res
    .cookie('accessToken', accessToken, {
      maxAge: 1000 * 60 * 60 * 24 * 7,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
    })
    .status(200)
    .json({
      user,
      message: 'Logged in succesfully !',
    });
});

router.post('/signout', (req, res) => {
  res
    .clearCookie('accessToken')
    .status(200)
    .json({ messsage: 'Successfully logged out ' });
});

router.post('/email-check', async (req, res) => {
  const { email } = req.body;

  const isEmailDuplicated = await Users.exists({ email });

  if (isEmailDuplicated) {
    return res.status(409).send({ message: 'Email already exists' });
  }

  return res.sendStatus(200);
});

router.post('/username-check', async (req, res) => {
  const { username } = req.body;

  const isUsernameDuplicated = await Users.exists({ username });
  if (isUsernameDuplicated) {
    return res.status(409).send({ message: 'Username already Exists' });
  }

  return res.sendStatus(200);
});

module.exports = router;
