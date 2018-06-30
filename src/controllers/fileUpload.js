"use strict";
const crypto = require('crypto');
const mime = require('mime');
const multer = require('multer');

let storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, __dirname+'/../uploads')
  },
  filename: function (req, file, callback) {
    crypto.pseudoRandomBytes(16, function (err, raw) {
      callback(null, raw.toString('hex') + Date.now() + '.' + mime.extension(file.mimetype));
    });
  }
});

const uploadSingleFile = (req, res) => {
  let uploadFile = multer({ storage: storage, limits: { fileSize: 1024 * 1024 }}).single('file');
  
  uploadFile(req, res, (error) => {
    return error ? 
      res.status(400).json({ errorMessage: 'Error uploading file', error: error}) :
      res.status(200).json({success: 'The upload was successful', fileName: req.file.filename})
  });
};

module.exports = {
    uploadSingleFile
};