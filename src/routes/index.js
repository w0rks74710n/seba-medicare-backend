"use strict";

const express  = require('express');
const router   = express.Router();

router.use('/', function(req, res) {
    res.send('<html><body><h1>Welcome to MediCare!</h1></body></html>');
});
router.use('/api', require('./api'));

module.exports = router;