const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const routes = require('./routes/index');
const path = require('path');

const app = express();

// Testing
app.use(bodyParser.json());

app.use(session({
	secret: 'secret',
	resave: true,
	saveUninitialized: true
}));

app.use(bodyParser.urlencoded({ extended: true })); 

app.set('views', path.join(__dirname, 'views'));

app.set('view engine', 'pug');

app.use(express.static('public'));

app.use('/', routes);

module.exports = app;