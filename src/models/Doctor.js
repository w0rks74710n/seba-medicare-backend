"use strict";

const mongoose = require('mongoose');

// Define the Doctor schema

const DoctorSchema  = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  }
});

DoctorSchema.set('versionKey', false);

// Export the Movie model
module.exports = mongoose.model('Doctor', DoctorSchema);