"use strict";
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const config = require('../config');
const DoctorModel = require('../models/doctor');
const DoctorProfileInformationModel = require('../models/doctorProfileInformation');

const register = (req, res) => {
  if (validateRegisterRequest(req, res)) {
    const doctor = Object.assign(req.body, {password: bcrypt.hashSync(req.body.password, 8)});

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

      const token = jwt.sign({ id: doctor._id, username: doctor.username }, config.JwtSecret, {
        expiresIn: 86400
      });

      res.status(200).json({token: token});
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

function validateRegisterRequest(req, res) {
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
  register
};
