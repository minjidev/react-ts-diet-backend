const express = require('express');
const cookieParser = require('cookie-parser');

const dotenv = require('dotenv');

dotenv.config();

const app = express();
const port = process.env.PORT || 8000;

const api = require('../routes');
const jwtMiddleware = require('../lib/jwtMiddleware');

// 항상 요청되는 미들웨어
app.use(express.json());
app.use(cookieParser());
app.use(jwtMiddleware);

app.use('/api', api);

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
