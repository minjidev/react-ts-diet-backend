const mongoose = require('mongoose');

const mongoDB =
  'mongodb://root:rootuser@127.0.0.0:27017/admin?authSource=admin';

const connect = async () => {
  if (process.env.NODE_ENV !== 'production') {
    mongoose.set('debug', true);
  }

  try {
    await mongoose.connect(mongoDB, {
      dbName: 'nodejs',
      useNewUrlParser: true,
    });
    console.log('MongoDB connected!');
  } catch (error) {
    console.error('MongoDB failed to connect', error);
  }
};

process.on('unhandledRejection', (error) => {
  console.error('Unhandled Promise Rejection:', error);
});

mongoose.connection.on('error', (error) => {
  console.log('Mongodb failed to connect', error);
});

mongoose.connection.on('disconnected', () => {
  console.error('Disconnected. Retry to connect...');
  connect();
});

module.exports = connect;
