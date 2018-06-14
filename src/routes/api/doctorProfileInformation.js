"use strict";

const express  = require('express');
const router   = express.Router();

const DoctorProfileInformationController = require('../../controllers/doctorProfileInformation');

router.put('/:doctor_id', DoctorProfileInformationController.update);

module.exports = router;