"use strict";

const express  = require('express');
const router   = express.Router();

const AppoinmentController = require('../../controllers/appoinment');

router.post('/', AppoinmentController.create);
router.put('/:appoinment_id', AppoinmentController.update);
router.delete('/:appoinment_id', AppoinmentController.cancel);

module.exports = router;