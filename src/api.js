"use strict";

const express    = require('express');
const bodyParser = require('body-parser');
const helmet     = require('helmet');
const root       = require('./routes/root');

const api = express();


// Adding Basic Middlewares
api.use(helmet());
api.use(bodyParser.json());
api.use(bodyParser.urlencoded({ extended: false }));

// Basic route
api.get('/', function (req, res) {
    res.send('<h1>Hello World!</h1>')
});

// API routes
api.use('/root', root);

module.exports = api;