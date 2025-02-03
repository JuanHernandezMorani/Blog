const { Router } = require('express');
const posts = require('./posts.js');
const server = Router();

server.use('/posts', posts);

module.exports = server;