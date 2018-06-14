"use strict"

const express  = require('express');
const router   = express.Router();

const DoctorController = require('../../controllers/doctor');

router.post('/', DoctorController.create);

module.exports = router;