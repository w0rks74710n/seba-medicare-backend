"use strict";

const config = require('../config');
const AppointmentModel = require('../models/appointment');

const create = (req, res) => {
  //First check the properties
  if (!Object.prototype.hasOwnProperty.call(req.body, 'doctor_id')) return res.status(400).json({
    error: 'Bad Request',
    message: 'The request body must contain a doctor_id property'
  });

  if (!Object.prototype.hasOwnProperty.call(req.body, 'patient_id')) return res.status(400).json({
    error: 'Bad Request',
    message: 'The request body must contain a patient_id property'
  });

  if (!Object.prototype.hasOwnProperty.call(req.body, 'date')) return res.status(400).json({
    error: 'Bad Request',
    message: 'The request body must contain a date property'
  });

  //Then create appointment
  const appointment = Object.assign(req.body);

  //These functions: [create, findOneAndUpdate, find, deleteOne]
  //are called using mongoose queries
  //AppointmentModel is a mongoose.model indeed, Schema
  AppointmentModel.create(appointment)
    .then(appointment => {
      res.status(200).json({successfullyCreated: 'Model', appointment_id: appointment._id});
    })
    .catch(error => {
      if(error.code == 11000) {
        res.status(400).json({
          error: 'Appointment is already exist',
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

const get = (req, res) => {
  //First check the properties
  if (!Object.prototype.hasOwnProperty.call(req.params, 'doctor_id')) return res.status(400).json({
    error: 'Bad Request',
    message: 'The request parameters must contain a doctor_id property'
  });

  AppointmentModel.find({ doctor_id: req.params.doctor_id }).exec(function(error, appointment) {
    if (!error) {
      res.status(200).json({appointment});
    } else {
      res.status(400).json({
        error: error.message,
        message: 'This appointment does not exist! Please verify.'
      });
    }
  });
};

const update = (req, res) => {
  //First check the properties
  if (!Object.prototype.hasOwnProperty.call(req.params, 'appointment_id')) return res.status(400).json({
    error: 'Bad Request',
    message: 'The request parameters must contain an appointment_id property'
  });

  if (!Object.prototype.hasOwnProperty.call(req.body, 'date')) return res.status(400).json({
    error: 'Bad Request',
    message: 'The request body must contain a date property'
  });

  //Then update appointment
  const appointment = Object.assign(req.body);
  const query = { _id: req.params.appointment_id };

  //A.findOneAndUpdate(conditions, update, options, callback)
  AppointmentModel.findOneAndUpdate(query, appointment, () => {
    res.status(200).json({
      successfullyUpdated: 'Appointment',
      appointment_id: appointment._id,
      newdate: appointment.date
    });
  }).catch(error => {
    if(error.code == 11000) {
      res.status(400).json({
        error: 'Appointment already exists',
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
  if (!Object.prototype.hasOwnProperty.call(req.params, 'appointment_id')) return res.status(400).json({
    error: 'Bad Request',
    message: 'The request parameters must contain an appointment_id property'
  });

  //Then remove appointment
  AppointmentModel.findByIdAndRemove(req.params.appointment_id).exec()
    .then(() => res.status(200).json({
      successfullyRemoved: 'Appointment',
      appointment_id: req.params.appointment_id
    }))
    .catch(error => res.status(500).json({
      error: 'Internal server error',
      message: error.message
    }));
};

module.exports = {
  create,
  get,
  update,
  deleteAppointment
};