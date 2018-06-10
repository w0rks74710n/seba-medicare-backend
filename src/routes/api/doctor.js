"use strict"

const express  = require('express');
const router   = express.Router();

const DoctorController = require('../../Controllers/Doctor');

router.post('/', DoctorController.create);

module.exports = router;