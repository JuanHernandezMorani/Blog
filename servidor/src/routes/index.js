const { Router } = require('express');
const posts = require('./posts.js');
const favIcon = require('./favicon.js');
const subscriber = require('./subscriber.js');
const server = Router();

server.use('/posts', posts);
server.use('/favicon.ico', favIcon);
server.use('/subscriber', subscriber);

module.exports = server;