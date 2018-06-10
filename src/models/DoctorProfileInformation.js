"use strict";

import mongoose from 'mongoose';

// Define the DoctorProfileInformation schema

const DoctorProfileInformationSchema = new mongoose.Schema({
  doctor_id: ObjectId,
  about: {
    description: String
  },
  contactInformation: {
    fullName: String,
    email: String,
    mobile: Number,
    practiceWebsite: String,
    addressLine1: String,
    addressLine2: String
  },
  socialMedia: {
    facebook: String,
    linkedIn: String,
    xing: String
  },
  experience: {
    areaOfSpecialization: String,
    yearsOfExperience: Number,
    previousExperiences: String,
    treatmentFocus: String
  },
  education: {
    university: String
  }
});

DoctorProfileInformationSchema.set('versionKey', false);

// Export the Movie model
module.exports = mongoose.model('DoctorProfileInformation', DoctorProfileInformationSchema);