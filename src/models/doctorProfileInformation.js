"use strict";

const mongoose = require('mongoose');

// Define the DoctorProfileInformation schema

const DoctorProfileInformationSchema = new mongoose.Schema({
  doctor_id: mongoose.Schema.ObjectId,
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
  },
  images: {
    profilePic: String,
    praxisPic1: String,
    praxisPic2: String,
    praxisPic3: String,
    praxisPic4: String
  }
}, { minimize: false });

DoctorProfileInformationSchema.set('versionKey', false);

// Export the Movie model
module.exports = mongoose.model('DoctorProfileInformation', DoctorProfileInformationSchema);