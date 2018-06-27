"use strict";

const express  = require('express');
const router   = express.Router();

const DoctorController = require('../../controllers/doctor');

router.post('/register', DoctorController.register);

module.exports = router;