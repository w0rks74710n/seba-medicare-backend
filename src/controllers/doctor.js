"use strict";

const DoctorModel = require('../models/doctor');
const DoctorProfileInformationModel = require('../models/doctorProfileInformation');

const create = (req, res) => {

  if (validateCreateRequest(req, res)) {
    const doctor = Object.assign(req.body);

    DoctorModel.create(doctor).then(doctor => {
        const doctorProfileInformation =
          new DoctorProfileInformationModel({doctor_id: doctor._id,
            about: {},
            contactInformation: {},
            socialMedia: {},
            experience: {},
            education: {},
            services: {},
            images: {}
          });

        DoctorProfileInformationModel.create(doctorProfileInformation);
        res.status(200).json({successfullyCreated: 'Model', doctorId: doctor._id});
      }).catch(error => {
        if(error.code == 11000) {
          res.status(400).json({
            error: 'User exists',
            message: error.message
          })
        } else {
          res.status(500).json({
            error: 'Internal server error',
            message: error.message
          })
        }
      });
  }
};

const getById = (req, res) => {
  if (!Object.prototype.hasOwnProperty.call(req.params, 'doctor_id')) return res.status(400).json({
    error: 'Bad Request',
    message: 'The request parameters must contain a doctor_id'
  });

  DoctorModel.findOne({ _id: req.params.doctor_id }).exec(function(error, doctor) {
    if (!error) {
      res.status(200).json({doctor});
    } else {
      res.status(400).json({
        error: error.message,
        message: 'This doctor does not exist! Please verify.'
      });
    }
  });

};

function validateCreateRequest(req, res) {
  if (!Object.prototype.hasOwnProperty.call(req.body, 'password')) return res.status(400).json({
    error: 'Bad Request',
    message: 'The request body must contain a password property'
  });

  if (!Object.prototype.hasOwnProperty.call(req.body, 'username')) return res.status(400).json({
    error: 'Bad Request',
    message: 'The request body must contain a username property'
  });

  if (!Object.prototype.hasOwnProperty.call(req.body, 'email')) return res.status(400).json({
    error: 'Bad Request',
    message: 'The request body must contain a email property'
  });

  if (!Object.prototype.hasOwnProperty.call(req.body, 'subscription')) return res.status(400).json({
    error: 'Bad Request',
    message: 'The request body must contain a subscription property'
  });

  return true;
}

module.exports = {
  create,
  getById
};
