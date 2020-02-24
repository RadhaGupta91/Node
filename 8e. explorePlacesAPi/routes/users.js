const mongoose = require('mongoose');
const express = require('express');
const bodyParser = require('body-parser');
const Users = require("../models/users");
const userController = require("../controllers/users-controllers");
var router = express.Router();
const { check, validationResult } = require('express-validator');

/* GET users listing. */
/*start***Either set 2 routes to get the same request or contact it as a single request to make id optional using ? */
//router.get('/', userController.fetchall);
// router.get('/:id([0-9]{0,2})',  userController.fetchall);
/*end***Either set 2 routes to get the same request or contact it as a single request to make id optional using ? */

/*start**Use regular expression to validate url params */
// router.get('/:id([0-9]{0,2})',  userController.fetchall);
/*end**Use regular expression to validate url params */

/**start**Users APIs */

//Get all users | Get user by ID
router.get('/:id?', userController.fetchall);

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

//Remove all users | remove user by ID
router.delete('/:id?',userController.remove );
/**end**Users APIs */

/**start**Places APIs */
//Get all Places by user ID
router.get('/:userID/places',userController.fetchAllPlacesByUserId);

//Get all places
router.get('/:userID/allPlaces', userController.fetchAllPlaces);
router.get('/:id/all', userController.all);

//Post new place by userID
router.post('/:userID/places', userController.postPlaces);

//Delete all places by userID | Delete places by userID & placeID
router.delete('/:userID/places/:placeID?', userController.removeAllPlaces);
/**end**Places APIs */

module.exports = router;
