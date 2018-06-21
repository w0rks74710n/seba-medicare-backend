"use strict";

const mongoose = require('mongoose');

// Define the Appoinment schema

const AppoinmentSchema  = new mongoose.Schema({
  doctor: {
    type: String,
    required: true,
    unique: true
  },
  patient: {
    type: String,
    required: true,
    unique: true
  },
  date: {
    type: Date,
    required: true
  }
});

AppoinmentSchema.set('versionKey', false);

// the schema is useless so far
// we need to create a model using it
var Appoinment = mongoose.model('Appoinment', AppoinmentSchema);

// make this available to our users in our Node applications
module.exports = Appoinment;