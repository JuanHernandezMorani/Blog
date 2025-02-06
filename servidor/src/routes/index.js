const { Router } = require('express');
const posts = require('./posts.js');
const favIcon = require('./favicon.js');
const server = Router();

server.use('/posts', posts);
server.use('/favicon', favIcon);

module.exports = server;