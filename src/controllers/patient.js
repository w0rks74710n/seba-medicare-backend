"use strict";
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const config = require('../config');
const PatientModel = require('../models/patient');

const register = (req, res) => {
  if (!Object.prototype.hasOwnProperty.call(req.body, 'password')) return res.status(400).json({
    error: 'Bad Request',
    message: 'The request body must contain a password property'
  });

  if (!Object.prototype.hasOwnProperty.call(req.body, 'username')) return res.status(400).json({
    error: 'Bad Request',
    message: 'The request body must contain a username property'
  });

  if (!Object.prototype.hasOwnProperty.call(req.body, 'fullName')) return res.status(400).json({
    error: 'Bad Request',
    message: 'The request body must contain a fullName property'
  });

  if (!Object.prototype.hasOwnProperty.call(req.body, 'email')) return res.status(400).json({
    error: 'Bad Request',
    message: 'The request body must contain a email property'
  });

  const patient = Object.assign(req.body, {password: bcrypt.hashSync(req.body.password, 8)});

  PatientModel.create(patient)
    .then((patient) => {
      const token = jwt.sign({ id: patient._id, username: patient.username }, config.JwtSecret, {
        expiresIn: 86400
      });

      res.status(200).json({token: token});
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

const login = (req,res) => {
  if (!Object.prototype.hasOwnProperty.call(req.body, 'password')) return res.status(400).json({
    error: 'Bad Request',
    message: 'The request body must contain a password property'
  });

  if (!Object.prototype.hasOwnProperty.call(req.body, 'username')) return res.status(400).json({
    error: 'Bad Request',
    message: 'The request body must contain a username property'
  });

  PatientModel.findOne({username: req.body.username}).exec()
    .then((patient) => {

      const isPasswordValid = bcrypt.compareSync(req.body.password, patient.password);
      if (!isPasswordValid) return res.status(401).send({token: null });

      const token = jwt.sign({ id: patient._id, username: patient.username }, config.JwtSecret, {
        expiresIn: 86400
      });

      res.status(200).json({token: token});
    })
    .catch(error => res.status(404).json({
      error: 'User Not Found',
      message: error.message
    }));
};

const getPatient = (req, res) => {
  //First check the properties
  if (!Object.prototype.hasOwnProperty.call(req.params, 'patient_id')) return res.status(400).json({
    error: 'Bad Request',
    message: 'The request parameters must contain a patient_id property'
  });

  PatientModel.findById(req.params.patient_id).exec(function(error, patient) {
    if (!error) {
      res.status(200).json({patient});
    } else {
      res.status(400).json({
        error: error.message,
        message: 'This patient does not exist! Please verify.'
      });
    }
  });
};

const deleteUser = (req, res) => {
  //First check the properties
  if (!Object.prototype.hasOwnProperty.call(req.params, 'patient_id')) return res.status(400).json({
    error: 'Bad Request',
    message: 'The request parameters must contain an patient_id property'
  });

  //Then remove patient user
  PatientModel.findByIdAndRemove(req.params.patient_id).exec()
    .then(() => res.status(200).json({
      successfullyRemoved: 'Patient',
      patient_id: req.params.patient_id
    }))
    .catch(error => res.status(500).json({
      error: 'Internal server error',
      message: error.message
    }));
};

module.exports = {
  register,
  getPatient,
  deleteUser
};
