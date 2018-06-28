"use strict";

const express  = require('express');
const router   = express.Router();
const bodyParser = require('body-parser');
const helmet     = require('helmet');

const middlewares = require('../middlewares');

router.use(helmet());
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: false }));
router.use(middlewares.allowCrossDomain);

router.use('/api', require('./api'));
router.use('/', function(req, res) {
    res.send('<html><body><h1>Welcome to MediCare!</h1></body></html>');
});

module.exports = router;
