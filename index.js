"use strict";

const http       = require('http');
const express    = require('express');
const bodyParser = require('body-parser');
const helmet     = require('helmet');
const routes     = require('./src/routes/index');
const config     = require('./src/config');


// Create global app object
const app = express();

// Normal express config defaults
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(helmet());
app.use(routes);

/// catch 404 and forward to error handler
app.use(function(req, res, next) {
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
});

const server = app.listen( config.port, function(){
    console.log('Listening on port ' + server.address().port);
});