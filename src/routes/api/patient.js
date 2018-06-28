"use strict";

/************
 Express is middleware between https requests: POST / GET / PUT / DELETE.. and between controllers
 So, express using routes to forward requests to corresponding controller class that we create for
 doing CRUD operations.
 Model objects are manipulated by those controllers
 So between DB and controller: we have model classes.
*************/

const express  = require('express');
const router   = express.Router();

const PatientController = require('../../controllers/patient');

router.post('/register', PatientController.register);
router.get('/:patient_id', PatientController.getUser);
router.delete('/:patient_id', PatientController.deleteUser);

module.exports = router;