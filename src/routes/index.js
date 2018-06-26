"use strict";
// Main entry point of our application
// Express is a web framework that we’ll be using for building the REST APIs
// body-parser is a module that parses the request (of various content types) and creates a req.body object that we can access in our routes.
// middleware is a function that has access to the request and response objects.
//It can execute any code, transform the request object, or return a response.

const express  = require('express');
const router   = express.Router();
const bodyParser = require('body-parser');
const helmet     = require('helmet');

const middlewares = require('../middlewares');

router.use(helmet())
router.use(bodyParser.json())
router.use(bodyParser.urlencoded({ extended: false }));
router.use(middlewares.allowCrossDomain);

router.use('/api', require('./api'));
router.use('/', function(req, res) {
    res.send('<html><body><h1>Welcome to MediCare!</h1></body></html>');
});

module.exports = router;