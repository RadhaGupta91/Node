const mongoose = require('mongoose');
const express = require('express');
const bodyParser = require('body-parser');
const Users = require("../models/users");
const userController = require("../controllers/users-controllers");
var router = express.Router();
const { check, validationResult } = require('express-validator');

/** GET users listing. */
router.get('/', userController.fetchall);

/** GET user by ID. */
router.get('/:id',  userController.fetchall);

/*start**Use regular expression to validate url params */
// router.get('/:id([0-9]{0,2})',  userController.fetchall);
/*end**Use regular expression to validate url params */

/** Get all Places by user ID  */
router.get('/:userID/places', userController.fetchAllPlacesByUserId);

/** Get all places  */ 
router.get('/places', userController.fetchAllPlaces);

/** Post new place  */ 
router.post('/:userID/places', userController.postPlaces);

/** Delete all places  */ 
router.delete('/:userID/places',userController.removeAllPlaces);

/** Delete places userid and by placeID */ 
router.delete('/:userID/places/:placeID?', userController.removeAllPlaces);

//Post new user
router.post('/signup',
            //apply validatoin rules
            check('name').not().isEmpty(),
            check('email')
            .normalizeEmail() //convert into lowercase
            .isEmail(),
            check('password').isLength({min:5}),

            //call controller
            userController.signup 
);

//Remove all record | remove record by ID
router.delete('/:id?',userController.remove );

module.exports = router;
