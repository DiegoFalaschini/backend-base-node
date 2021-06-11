// npm i cors
// npm i express-validator
// npm i bcryptjs

require('dotenv').config();

const Server = require('./models/server');

const server = new Server();

server.listen();