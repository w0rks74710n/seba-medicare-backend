"use strict";

const express  = require('express');
const router   = express.Router();

//Router uses all the routes -> api files what we created for indicated paths
//And those router files will handle other paths (appendix paths)
router.use('/doctorProfileInformation', require('./doctorProfileInformation'));
router.use('/doctor', require('./doctor'));
router.use('/patient', require('./patient'));
router.use('/appointment', require('./appointment'));
router.use('/auth', require('./auth'));
router.use('/review', require('./review'));
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
