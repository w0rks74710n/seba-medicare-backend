"use strict";

const express  = require('express');
const router   = express.Router();

const FileUploadController = require('../../controllers/fileUpload');

router.post('/', FileUploadController.uploadSingleFile);

module.exports = router;