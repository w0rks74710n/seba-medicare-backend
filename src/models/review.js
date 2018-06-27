"use strict";

const mongoose = require('mongoose');

const ReviewSchema  = new mongoose.Schema({
  doctor: {
    type: String,
    required: true
  },
  rating: {
    type: Number,
    required: true
  },
  comment: {
    type: String,
    required: false
  },
  date: {
    type: Date,
    required: true
  }
});

ReviewSchema.set('versionKey', false);
var Review = mongoose.model('Review', ReviewSchema);
module.exports = Review;