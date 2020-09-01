// Imports
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');


const userRoutes = require('./routes/user').router;
const messagesRoutes = require('./routes/messages').router;
const likesRoutes = require('./routes/likes').router;


const app = express();

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });

  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());

  app.use('/images', express.static(path.join(__dirname, 'images')));

  app.use('/api/', userRoutes);
  app.use('/api/profil/', userRoutes);
  app.use('/api/', messagesRoutes);
  app.use('/api/', likesRoutes);

module.exports = app;
