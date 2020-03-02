const express = require('express');
const bodyParser = require('body-parser');
const userRouter = require('./routes/user');
const mysqlConnection = require('./connect');
var logger = require('morgan');
const http = require('http');
const mysql = require('mysql');

const app = express();

app.use(bodyParser.json());

app.use('/',userRouter);
app.use(logger('dev'));

const server = http.createServer(app);
hostname = "localhost";
port = 3000;
server.listen(3000, 'localhost', () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});