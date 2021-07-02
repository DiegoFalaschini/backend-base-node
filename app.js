// npm i cors
// npm i express-validator
// npm i bcryptjs
// npm i jsonwebtoken

require('dotenv').config();

const Server = require('./models/server');

const server = new Server();

server.listen();