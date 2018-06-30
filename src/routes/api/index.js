"use strict";

const express  = require('express');
const router   = express.Router();
const path     =  require('path');

const publicImages = express.static(path.join(__dirname, '../../uploads'));

router.use('/doctorProfileInformation', require('./doctorProfileInformation'));
router.use('/doctor', require('./doctor'));
router.use('/patient', require('./patient'));
router.use('/auth', require('./auth'));
router.use('/appoinment', require('./appoinment'));
router.use('/review', require('./review'));
router.use('/upload', require('./fileUpload'));
router.use('/uploads', publicImages);
router.use('/', require('./welcome'));

router.use(function(err, req, res, next){
    if(err.name === 'ValidationError'){
        return res.status(422).json({
            errors: Object.keys(err.errors).reduce(function(errors, key){
                errors[key] = err.errors[key].message;

                return errors;
            }, {})
        });
    }

    return next(err);
});

module.exports = router;
