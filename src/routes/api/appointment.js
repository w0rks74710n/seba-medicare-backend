"use strict";

/*************
 * We are in the routes -> api
 Express.Router is middleware between https requests: POST / GET / PUT / DELETE.. and controllers
 So express using routes to forward requests to corresponding controller class that we create for
 CRUD operations.
 Model objects are manipulated by those controllers
 So between DB and controller: we have model classes.
 Models, schemas, indicate how an object will store in mongoDB
 *************/

const express  = require('express');
const router   = express.Router();

const AppointmentController = require('../../controllers/appointment');

//General HTTP requests: [post, get, put, delete]
router.post('/:doctor_id', AppointmentController.create);
router.get('/:doctor_id', AppointmentController.get);
router.patch('/:appointment_id', AppointmentController.update);
router.delete('/:appointment_id', AppointmentController.deleteAppointment);

module.exports = router;