// node server for react app
// guide from ianposton
// https://ianposton.medium.com/create-react-app-deploy-to-heroku-7c3c03f34382

//imports
const express = require('express');
const http = require('http');
const path = require('path');

//instantiate app
let app = express();

//link express static hosting to build path
app.use(express.static(path.join(__dirname, 'build')));

//port definition, read from .env file
const port = process.env.PORT || '8080';
app.set('port', port);

//create server
const server = http.createServer(app);

server.listen(port, () => console.log(`Running on localhost:${port}`));