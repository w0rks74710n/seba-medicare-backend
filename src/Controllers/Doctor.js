"use strict";

const config = require('../config');
const DoctorModel = require('../models/Doctor');
const DoctorProfileInformationModel = require('../models/DoctorProfileInformation');

const create = (req, res) => {
  if (!Object.prototype.hasOwnProperty.call(req.body, 'password')) return res.status(400).json({
    error: 'Bad Request',
    message: 'The request body must contain a password property'
  });

  if (!Object.prototype.hasOwnProperty.call(req.body, 'username')) return res.status(400).json({
    error: 'Bad Request',
    message: 'The request body must contain a username property'
  });

  const doctor = Object.assign(req.body);

  DoctorModel.create(doctor)
    .then(doctor => {
      const doctorProfileInformation =
        new DoctorProfileInformationModel({doctor_id: doctor._id,
                                      about: {},
                                      contactInformation: {},
                                      socialMedia: {},
                                      experience: {},
                                      education: {}});
      DoctorProfileInformationModel.create(doctorProfileInformation);

      res.status(200).json({successfullyCreated: 'Model'});

    })
    .catch(error => {
      if(error.code == 11000) {
        res.status(400).json({
          error: 'User exists',
          message: error.message
        })
      }
      else{
        res.status(500).json({
          error: 'Internal server error',
          message: error.message
        })
      }
    });
};

module.exports = {
  create
};
