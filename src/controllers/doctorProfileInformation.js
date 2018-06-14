"use strict";

const DoctorProfileInformationModel = require('../models/doctorProfileInformation');

const update = (req, res) => {

  if (!Object.prototype.hasOwnProperty.call(req.params, 'doctor_id')) return res.status(400).json({
    error: 'Bad Request',
    message: 'The request parameters must contain a doctor_id'
  });

  const doctorProfileInformation = Object.assign(req.body);
  const query = {doctor_id: req.params.doctor_id};

  DoctorProfileInformationModel.findOneAndUpdate(query, doctorProfileInformation, () => {
    res.status(200).json({successfullyUpdated: 'Doctor Profile', doctorId: req.params.doctor_id});
  })
    .catch(error => {
      if(error.code == 11000) {
        res.status(400).json({
          error: 'DoctorProfileInformation already exists',
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
  update
};
