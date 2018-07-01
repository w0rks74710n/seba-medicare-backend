"use strict";

const DoctorProfileInformationModel = require('../models/doctorProfileInformation');

const updateById = (req, res) => {
  console.log(req.body);

  if (!Object.prototype.hasOwnProperty.call(req.params, 'doctor_id')) return res.status(400).json({
    error: 'Bad Request',
    message: 'The request parameters must contain a doctor_id'
  });

  const doctorProfileInformation = Object.assign(req.body);
  const query = {doctor_id: req.params.doctor_id};

  DoctorProfileInformationModel.findOneAndUpdate(query, doctorProfileInformation, () => {
    res.status(200).json({
      successfullyUpdated: 'Doctor Profile',
      doctorId: req.params.doctor_id
    });
  }).catch(error => {
      if(error.code == 11000) {
        res.status(400).json({
          error: 'DoctorProfileInformation already exists',
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

const getById = (req, res) => {
  if (!Object.prototype.hasOwnProperty.call(req.params, 'doctor_id')) return res.status(400).json({
    error: 'Bad Request',
    message: ' The request parameters must contain a doctor_id'
  });

  DoctorProfileInformationModel.findOne({ doctor_id: req.params.doctor_id }).exec(function(error, doctorProfileInformation) {
    if (!error) {
      res.status(200).json({doctorProfileInformation});
    } else {
      res.status(400).json({
        error: error.message,
        message: 'DoctorProfileInformation does not exist'
      })
    }
  });
};

const get = (req, res) => {

  console.log(req.query);
  var query = {};
  let insurance = req.query.isInsuranceSelected;
  let language = req.query.isLanguageSelected;
  let emergency = req.query.isEmergencySelected;
  let rating = req.query.isRatingSelected;
  let areaOfSpecialization = req.query.isAreaOfSpecialitySelected;

  insurance            !== 'noPreference' ? query['services.insuranceType']           = new RegExp(insurance, 'i')            : query
  language             !== 'noPreference' ? query['services.languages']               = new RegExp(language, 'i')             : query
  emergency            !== 'noPreference' ? query['services.emergencyAbailable']      = (emergency === '1' ? true : false)    : query
  rating               !== 'noPreference' ? query['services.rating']                  = parseInt(rating)                      : query
  areaOfSpecialization !== 'noPreference' ? query['experience.areaOfSpecialization']  = new RegExp(areaOfSpecialization, 'i') : query

  console.log(query);

  DoctorProfileInformationModel.find(query, (error, doctorProfileInformation) => {
    if (!error) {
      res.status(200).json({doctorProfileInformation});
    } else {
      res.status(400).json({
        error: error.message,
        message: 'DoctorProfileInformation does not exist'
      })
    }
  });
}

module.exports = {
  updateById,
  getById,
  get
};
