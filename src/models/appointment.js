"use strict";

const mongoose = require('mongoose');

// Define the Appointment schema

const AppointmentSchema  = new mongoose.Schema({
  doctor: {
    type: String,
    required: true
  },
  patient: {
    type: String,
    required: true
  },
  illness: {
    type: String,
    required: false
  },
  date: {
    type: String,
    required: true
  }
});

AppointmentSchema.set('versionKey', false);

// the schema is useless so far
// we need to create a model using it
var Appointment = mongoose.model('Appointment', AppointmentSchema);

// make this available to our users in our Node applications
module.exports = Appointment;