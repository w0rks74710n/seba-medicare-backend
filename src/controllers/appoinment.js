"use strict";

const config = require('../config');
const AppoinmentModel = require('../models/appoinment');

const create = (req, res) => {
  //First check the properties
  if (!Object.prototype.hasOwnProperty.call(req.body, 'doctor')) return res.status(400).json({
    error: 'Bad Request',
    message: 'The request body must contain a doctor property'
  });

  if (!Object.prototype.hasOwnProperty.call(req.body, 'patient')) return res.status(400).json({
    error: 'Bad Request',
    message: 'The request body must contain a patient property'
  });

  if (!Object.prototype.hasOwnProperty.call(req.body, 'date')) return res.status(400).json({
    error: 'Bad Request',
    message: 'The request body must contain a date property'
  });

  //Then create appoinment
  const appoinment = Object.assign(req.body);

  AppoinmentModel.create(appoinment)
    .then(appoinment => {
      res.status(200).json({successfullyCreated: 'Model'});
    })
    .catch(error => {
      if(error.code == 11000) {
        res.status(400).json({
          error: 'Appoinment is already exist',
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

const update = (req, res) => {
  //First check the properties
  if (!Object.prototype.hasOwnProperty.call(req.body, 'doctor')) return res.status(400).json({
    error: 'Bad Request',
    message: 'The request body must contain a doctor property'
  });

  if (!Object.prototype.hasOwnProperty.call(req.body, 'patient')) return res.status(400).json({
    error: 'Bad Request',
    message: 'The request body must contain a patient property'
  });

  if (!Object.prototype.hasOwnProperty.call(req.body, 'date')) return res.status(400).json({
    error: 'Bad Request',
    message: 'The request body must contain a date property'
  });

  //Then update appoinment
  const appoinment = Object.assign(req.body);
  const query = {doctor: req.params.doctor, patient: req.params.patient};

  AppoinmentModel.findOneAndUpdate(query, appoinment.date, () => {
    res.status(200).json({
      successfullyUpdated: 'Appoinment',
      doctor: req.params.doctor,
      patient: req.params.patient
    });
  }).catch(error => {
    if(error.code == 11000) {
      res.status(400).json({
        error: 'Appoinment already exists',
        message: error.message
      })
    } else {
      res.status(500).json({
        error: 'Internal server error',
        message: error.message
      })
    }
  });
};

const deleteAppointment = (req, res) => {
  //First check the properties
  if (!Object.prototype.hasOwnProperty.call(req.body, 'doctor')) return res.status(400).json({
    error: 'Bad Request',
    message: 'The request body must contain a doctor property'
  });

  if (!Object.prototype.hasOwnProperty.call(req.body, 'patient')) return res.status(400).json({
    error: 'Bad Request',
    message: 'The request body must contain a patient property'
  });

  //Then remove appoinment
  const query = {doctor: req.params.doctor, patient: req.params.patient};

  AppoinmentModel.deleteOne(query, () => {
    res.status(200).json({
      successfullyRemoved: 'Appoinment',
      doctor: req.params.doctor,
      patient: req.params.patient
    });
  }).catch(error => {
      res.status(500).json({
        error: 'Internal server error',
        message: error.message
      })
  });
};

module.exports = {
  create,
  update,
  deleteAppointment
};