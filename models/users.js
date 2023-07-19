const jwt = require('jsonwebtoken');

let users = [
  {
    userId: 0,
    email: 'test@naver.com',
    password: '123123123',
    username: 'Test 계정',
  },
  {
    userId: 1,
    email: 'bin000527@naver.com',
    password: '12345678',
    username: '웨스트달러예빈',
  },
  {
    userId: 2,
    email: 'rok.ksohn@gmail.com',
    password: '12345678',
    username: '유사한국인제임스',
  },
  {
    userId: 3,
    email: 'alswl99710@gmail.com',
    password: '12345678',
    username: '서면퀸민지',
  },
  {
    userId: 4,
    email: 'sanbondeveloper@gmail.com',
    password: 'adfkjadfkjakfd',
    username: '피오깃경민',
  },
];

const createUserId = () => Math.max(...users.map((user) => user.userId), 0);

const getUser = () => users;

const generateToken = (user) => {
  const token = jwt.sign(user, process.env.JWT_SECRET_KEY, {
    expiresIn: '7d',
  });

  return token;
};

const getUserByNickname = (nickname) =>
  users.find((user) => user.nickname === nickname);

const getUserByEmail = (email) => users.find((user) => user.email === email);

const getUserByEmailPw = ({ email, password }) =>
  users.find((user) => user.email === email && user.password === password);

const createUser = (newUser) => {
  users = [...users, newUser];

  return newUser;
};

const checkEmailDuplicated = (_email) =>
  !!users.find(({ email }) => _email === email);

const checkUsernameDuplicated = (_username) =>
  !!users.find(({ username }) => _username === username);

module.exports = {
  createUserId,
  createUser,
  getUserByNickname,
  getUser,
  getUserByEmail,
  getUserByEmailPw,
  generateToken,
  checkEmailDuplicated,
  checkUsernameDuplicated,
};
