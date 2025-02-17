const express = require('express'); // Express app
const router = express.Router(); // Router logic
const { expressjwt: jwt } = require('express-jwt');

const auth = jwt({
    secret: process.env.JWT_SECRET,
    algorithms: ['HS256'],  // Specify the algorithm used for signing the JWT
    userProperty: 'payload'
});

// This is where we import the controllers we intend to route
const tripsController = require('../controllers/trips');
const authController = require('../controllers/authentication');

// define route for our trips endpoint
router
    .route('/trips')
    .get(tripsController.tripsList) // GET Method routes triplist
    .post(auth, tripsController.tripsAddTrip) // POST Method Adds a Trip

router
    .route('/login')
    .post(authController.login); // POST Method to login

router
    .route('/register')
    .post(authController.register);

// GET Method routes tripsFindByCode - requires parameter
router
    .route('/trips/:tripCode')
    .get(tripsController.tripsFindByCode)
    .put(auth, tripsController.tripsUpdateTrip);

module.exports = router;