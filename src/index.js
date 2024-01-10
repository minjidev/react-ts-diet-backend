const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const dotenv = require('dotenv');
const connect = require('../schemas/index');

dotenv.config();

const app = express();
const port = process.env.PORT || 8000;

const api = require('../routes');
const jwtMiddleware = require('../lib/jwtMiddleware');

const corsOptions = {
  origin: ['https://nutrinotes.net', 'http://localhost:5174'],
  methods: 'GET,PUT,POST,DELETE',
  allowedHeaders: 'Content-Type,Authorization',
};

app.use(cors(corsOptions));

connect();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(jwtMiddleware);

app.use('/api', api);

app.get('/', (req, res) => {
  res.sendStatus(200);
});

app.listen(port, () => {
  console.log(`[server]: Server is running at ${port}`);
});
