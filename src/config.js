"use strict";

//Configuration variables
const port     = process.env.PORT || '3001';
const mongoURI = process.env.MONGODB_URI || 'mongodb://mongo:27017/medicare';

module.exports = {
    port,
    mongoURI
};