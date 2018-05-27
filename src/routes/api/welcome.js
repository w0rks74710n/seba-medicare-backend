"use strict"

const express  = require('express');
const router   = express.Router();

router.get('/', function (req, res) {
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify({
        'welcome to medicare web api':'please read the documentation before using it!'
    }));
});

module.exports = router;