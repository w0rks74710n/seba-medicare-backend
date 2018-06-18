"use strict";

const mongoose = require('mongoose');

// Define the Patient schema

const PatientSchema  = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  dateOfBirth: {
    type: Date,
    required: false
  },
  address1: {
    type: String,
    required: true
  },
  address2: {
    type: String,
    required: false
  },
  phone: {
    type: Number,
    required: false
  },
  picture: {
    type: String,
    required: false
  },
  fullName: {
    type: String,
    required: true
  }
});

PatientSchema.set('versionKey', false);

// Export the Movie model
module.exports = mongoose.model('Patient', PatientSchema);