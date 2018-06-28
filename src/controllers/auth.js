"use strict";
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const config = require('../config');
const DoctorModel = require('../models/doctor');
const PatientModel = require('../models/patient');


const login = (req,res) => {
  if (!Object.prototype.hasOwnProperty.call(req.body, 'password')) return res.status(400).json({
    error: 'Bad Request',
    message: 'The request body must contain a password property'
  });

  if (!Object.prototype.hasOwnProperty.call(req.body, 'username')) return res.status(400).json({
    error: 'Bad Request',
    message: 'The request body must contain a username property'
  });

  DoctorModel.findOne({username: req.body.username}).exec().then((doctor) => {
    return doctor && isValidUserPassword(req, doctor) ?
          generateAndSetToken(res, doctor, 'doctor') :
          res.status(404).json({error: 'Wrong Password', message: error.message, token: null});
  }).catch(() => {
    PatientModel.findOne({username: req.body.username}).exec().then((patient) => {
      return patient && isValidUserPassword(req, patient) ?
             generateAndSetToken(res, patient, 'patient') :
             res.status(404).json({error: 'Wrong Password', message: error.message, token: null});
    }).catch((error) => {
      return res.status(404).json({
        error: 'User Not Found',
        message: error,
        token: null
      });
    });
  });
};

function isValidUserPassword(req, user) {
  return bcrypt.compareSync(req.body.password, user.password);
}

function generateAndSetToken(res, user, userType) {
  const token = jwt.sign({ id: user._id, username: user.username }, config.JwtSecret, {
    expiresIn: 86400
  });
  res.status(200).json({token: token, userType: userType, id: user._id});
}

module.exports = {
  login
};
