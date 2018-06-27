"use strict";

const express  = require('express');
const router   = express.Router();

const ReviewController = require('../../controllers/review');

router.get('/:doctor', ReviewController.getList);
router.post('/', ReviewController.create);

module.exports = router;