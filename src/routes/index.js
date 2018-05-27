"use strict";

const express  = require('express');
const router   = express.Router();

router.use('/api', require('./api'));
router.use('/', function(req, res) {
    res.send('<html><body><h1>Welcome to MediCare!</h1></body></html>');
});

module.exports = router;