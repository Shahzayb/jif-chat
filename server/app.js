const express = require('express');
const logger = require('morgan');
const compression = require('compression');
const sslRedirect = require('heroku-ssl-redirect');
const path = require('path');

const app = express();

const env = app.get('env');

/**
 * Custom .env cofiguration
 */
if (env !== 'production') {
  const result = require('dotenv').config({
    path: path.join(__dirname, './config/dev.env')
  });
  if (result.error) {
    throw result.error;
  }
}

const postRoute = require('./route/post');
const authRoute = require('./route/auth');
const userRoute = require('./route/user');
const cloudinaryRoute = require('./route/cloudinary');

// enable ssl redirect in production
app.use(sslRedirect());
app.use(logger('combined'));
app.use(express.json());
app.use(compression());

app.use('/api/post/', postRoute);
app.use('/api/auth/', authRoute);
app.use('/api/user/', userRoute);
app.use('/api/cloudinary/', cloudinaryRoute);

if (env === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build/')));

  app.get('*', (req, res) =>
    res.sendFile(path.join(__dirname, '../client/build/index.html'))
  );
}

require('./db'); // connecting to database

const PORT = process.env.PORT || '5000';

app.listen(PORT, () => console.log(`${env} server started on port ${PORT}`));
