"use strict";

const ReviewModel = require('../models/review');

const create = (req, res) => {
  if (!Object.prototype.hasOwnProperty.call(req.body, 'doctor')) return res.status(400).json({
    error: 'Bad Request',
    message: 'The request body must contain a doctor property'
  });

  if (!Object.prototype.hasOwnProperty.call(req.body, 'rating')) return res.status(400).json({
    error: 'Bad Request',
    message: 'The request body must contain a rating property'
  });

  if (!Object.prototype.hasOwnProperty.call(req.body, 'date')) return res.status(400).json({
    error: 'Bad Request',
    message: 'The request body must contain a date property'
  });

  const review = Object.assign(req.body);

  ReviewModel.create(review)
    .then(review => {
      res.status(200).json({successfullyCreated: 'Model'});
    })
    .catch(error => {
      if(error.code == 11000) {
        res.status(400).json({
          error: 'Review already exist',
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


  const getList = (req, res) => {
    if (!Object.prototype.hasOwnProperty.call(req.params, 'doctor')) return res.status(400).json({
      error: 'Bad Request',
      message: 'The request parameters must contain a doctor id'
    });
  
    ReviewModel.find({ doctor: req.params.doctor }).exec(function(error, review) {
      if (!error) {
        res.status(200).json({review});
      } else {
        res.status(400).json({
          error: error.message,
          message: 'This doctor does not exist! Please verify.'
        });
      }
    });
  
  };

module.exports = {
  create,
  getList
};