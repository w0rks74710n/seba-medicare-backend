"use strict";

const express  = require('express');
const router   = express.Router();

const DoctorProfileInformationController = require('../../controllers/doctorProfileInformation');

router.patch('/:doctor_id', DoctorProfileInformationController.updateById);
router.get('/:doctor_id', DoctorProfileInformationController.getById);

module.exports = router;